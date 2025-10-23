import { Home, Award, DollarSign, Lightbulb, FileText, Bookmark, MessageCircle, Settings, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ProfileSettingsDialog } from "./ProfileSettingsDialog";
import { toast } from "sonner";
import blueprintsLogo from "@/assets/blueprints-logo.png";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Grants", url: "/grants", icon: Award },
  { title: "Loans", url: "/loans", icon: DollarSign },
  { title: "Idea Lab", url: "/idea-lab", icon: Lightbulb },
  { title: "Assistant", url: "/assistant", icon: MessageCircle },
  { title: "Licensing", url: "/licensing", icon: FileText },
  { title: "Saved", url: "/saved", icon: Bookmark },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out");
    } else {
      toast.success("Signed out successfully");
      navigate("/auth");
    }
  };

  return (
    <>
      <ProfileSettingsDialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen} />
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3 px-4 py-3">
            <img 
              src={blueprintsLogo} 
              alt="Arizona Funding Flow" 
              className="h-8 w-8 object-contain"
            />
            <div>
              <h2 className="font-bold text-lg">AZ Funding Flow</h2>
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to={item.url}
                    className={({ isActive }) => 
                      isActive 
                        ? "text-foreground bg-muted hover:bg-muted/80" 
                        : "text-foreground hover:bg-muted/50"
                    }
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="mt-auto border-t">
          <div className="p-2 space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => setProfileDialogOpen(true)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
