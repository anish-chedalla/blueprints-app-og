import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your Blueprints Assistant. I'm here to help you discover grants, understand licensing requirements, and plan your business funding strategy. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamChat = async (userMessage: string) => {
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;
      
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Rate limit exceeded. Please try again later.");
          return;
        }
        if (response.status === 402) {
          toast.error("AI service requires payment. Please contact support.");
          return;
        }
        throw new Error("Failed to get response");
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantMessage = "";

      // Add initial assistant message
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantMessage += content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: assistantMessage,
                };
                return updated;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantMessage += content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: assistantMessage,
                };
                return updated;
              });
            }
          } catch {}
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to send message. Please try again.");
      setMessages(prev => prev.slice(0, -1)); // Remove user message on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    await streamChat(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)]" style={{ background: "var(--gradient-hero)" }}>
        {/* Chat Container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 animate-fade-in-up ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {message.role === "assistant" && (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-primary bg-background ${isLoading && index === messages.length - 1 ? 'animate-pulse' : ''}`}>
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
                    B
                  </div>
                </div>
              )}
              
              <Card
                className={`max-w-[70%] px-4 py-3 ${
                  message.role === "assistant"
                    ? "bg-[#0a3d62] text-white border-[#0a3d62]"
                    : "bg-[#f3efe7] text-foreground border-[#f3efe7]"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </p>
              </Card>

              {message.role === "user" && (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 text-sm font-semibold text-white">
                  You
                </div>
              )}
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3 justify-start animate-fade-in">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-primary bg-background animate-pulse">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
                  B
                </div>
              </div>
              <Card className="px-4 py-3 bg-[#0a3d62] text-white border-[#0a3d62]">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Typing...</span>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex gap-2 max-w-4xl mx-auto">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about grants, loans, or licensing..."
                disabled={isLoading}
                className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="transition-all duration-200 hover:scale-105"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
