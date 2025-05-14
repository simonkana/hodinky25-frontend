"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function DashboardPage() {
  const [user, setUser] = useState<{ username?: string; email?: string }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast("Failed to load user data. Please log in again.");
        router.push("/auth/login");
      }
    };

    fetchUser();
  }, [router, toast]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to logout user");
      }

      localStorage.removeItem("token");
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during logout:", error);
      toast("Failed to logout user");
      router.push("/auth/login");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-border/60 bg-card/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <Button
          variant="default"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-10">
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-2 text-foreground">
            Welcome back,{" "}
            <span className="text-primary">{user.username || "User"}</span>!
          </h2>
          <p className="text-muted-foreground text-base">
            You are logged in as {user.email || "your email"}
          </p>
        </section>
        <section>
          <h3 className="text-lg font-medium mb-4 text-foreground">
            Your Activity
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6 border-none shadow-md bg-muted/60 hover:shadow-lg transition-shadow">
              <h4 className="font-medium mb-1 text-primary">Listings</h4>
              <p className="text-3xl font-bold text-foreground">0</p>
              <p className="text-sm text-muted-foreground">Active listings</p>
            </Card>
            <Card className="p-6 border-none shadow-md bg-muted/60 hover:shadow-lg transition-shadow">
              <h4 className="font-medium mb-1 text-primary">Favorites</h4>
              <p className="text-3xl font-bold text-foreground">0</p>
              <p className="text-sm text-muted-foreground">Saved items</p>
            </Card>
            <Card className="p-6 border-none shadow-md bg-muted/60 hover:shadow-lg transition-shadow">
              <h4 className="font-medium mb-1 text-primary">Messages</h4>
              <p className="text-3xl font-bold text-foreground">0</p>
              <p className="text-sm text-muted-foreground">Unread messages</p>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
