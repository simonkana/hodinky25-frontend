"use client";

import { ReactNode, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import {
  LayoutDashboard,
  List,
  Heart,
  MessageCircle,
  Settings,
  LogOut,
  Menu,
} from "@/components/ui/lucide-icons";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { API_BASE } from "@/lib/api";
import { Hodinky25Logo } from "@/components/ui/hodinky25-logo";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/listings", label: "Listings", icon: List },
  { href: "/dashboard/favorites", label: "Favorites", icon: Heart },
  { href: "/dashboard/messages", label: "Messages", icon: MessageCircle },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers,
      });

      if (response.ok) {
        localStorage.removeItem("token");
        router.push("/auth/login");
      } else {
        throw new Error("Failed to logout user");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast("Failed to logout user");
    }
  };
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity md:hidden ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={sidebarOpen ? "false" : "true"}
        onClick={() => setSidebarOpen(false)}
      />
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border/60 flex-shrink-0 flex flex-col items-stretch px-4 py-4 gap-2 transition-transform duration-200 md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:flex md:relative md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="mb-6 flex items-center justify-center md:justify-start">
          <Hodinky25Logo />
        </div>
        <nav
          className="flex flex-col gap-1 w-full"
          aria-label="Sidebar navigation"
        >
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 px-4 py-2 rounded-lg text-foreground hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary transition-colors font-medium",
                pathname === href && "bg-primary/10 text-primary"
              )}
              onClick={() => setSidebarOpen(false)}
              aria-current={pathname === href ? "page" : undefined}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <Button
          variant="default"
          className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5 mr-2" aria-hidden="true" />
          Logout
        </Button>
      </aside>
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top nav */}
        <header className="w-full border-b border-border/60 bg-card/80 backdrop-blur-md px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {/* Hamburger for mobile */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Open sidebar menu"
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <Menu className="w-6 h-6" />
            </button>
            {/* User info could go here if needed */}
          </div>
          <ModeToggle />
        </header>
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
