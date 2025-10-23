import { Home, Award, DollarSign, Lightbulb, FileText, Bookmark, MessageCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Layers } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

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
  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg border-2 border-primary flex items-center justify-center">
            <Layers className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="font-bold text-sm tracking-wide text-foreground">BLUEPRINTS</div>
            <div className="text-xs text-muted-foreground tracking-wide">ARIZONA EDITION</div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        }`
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6">
        <p className="text-xs text-muted-foreground">
          Empowering Arizona Small Businesses
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
