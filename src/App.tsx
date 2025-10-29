import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import Home from "./pages/Home";
import Grants from "./pages/Grants";
import Loans from "./pages/Loans";
import Dashboard from "./pages/Dashboard";
import ProgramDetail from "./pages/ProgramDetail";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import IdeaLab from "./pages/IdeaLab";
import Assistant from "./pages/Assistant";
import Saved from "./pages/Saved";
import Licensing from "./pages/Licensing";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={window.location.hostname.includes('github.io') ? '/blueprints-app-og' : ''}>
          <PageTransition>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Home />} />
              <Route path="/grants" element={
                <ProtectedRoute>
                  <Grants />
                </ProtectedRoute>
              } />
              <Route path="/loans" element={
                <ProtectedRoute>
                  <Loans />
                </ProtectedRoute>
              } />
              <Route path="/idea-lab" element={
                <ProtectedRoute>
                  <IdeaLab />
                </ProtectedRoute>
              } />
              <Route path="/assistant" element={
                <ProtectedRoute>
                  <Assistant />
                </ProtectedRoute>
              } />
              <Route path="/saved" element={
                <ProtectedRoute>
                  <Saved />
                </ProtectedRoute>
              } />
              <Route path="/licensing" element={
                <ProtectedRoute>
                  <Licensing />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/program/:id" element={
                <ProtectedRoute>
                  <ProgramDetail />
                </ProtectedRoute>
              } />
              <Route path="/onboarding" element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
