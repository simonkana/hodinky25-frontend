"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { API_BASE } from "@/lib/api";

type UserRole = "USER" | "ADMIN";

interface UserInfo {
  id?: number;
  username?: string;
  email?: string;
  role?: UserRole;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserInfo>({});
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/auth/login");
          return;
        }

        const response = await fetch(`${API_BASE}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          router.push("/auth/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching user data:", error);
          toast.error("Failed to load user data. Please log in again.");
          router.push("/auth/login");
        }
      }
    };

    fetchUser();

    return () => controller.abort();
  }, [router]);

  return (
    <>
      <section className="mb-10">
        <h1 className="text-2xl font-bold mb-4">Vítejte v přehledu</h1>
        <p className="text-muted-foreground">
          Toto je váš osobní přehled. Najdete zde základní informace o svém účtu
          a aktivitách na Hodinky25.
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-2 text-foreground">
          Vítejte zpět,{" "}
          <span className="text-primary">{user.username || "Uživatel"}</span>!
        </h2>
        <p className="text-muted-foreground text-base">
          Jste přihlášen jako {user.email || "váš email"}
        </p>
      </section>
      <section className="mb-10">
        <h3 className="text-lg font-medium mb-4 text-foreground">
          Vaše aktivita
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 border-none shadow-md bg-muted/60 hover:shadow-lg transition-shadow">
            <h4 className="font-medium mb-1 text-primary">Inzeráty</h4>
            <p className="text-3xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Aktivní inzeráty</p>
          </Card>
          <Card className="p-6 border-none shadow-md bg-muted/60 hover:shadow-lg transition-shadow">
            <h4 className="font-medium mb-1 text-primary">Oblíbené</h4>
            <p className="text-3xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Uložené položky</p>
          </Card>
          <Card className="p-6 border-none shadow-md bg-muted/60 hover:shadow-lg transition-shadow">
            <h4 className="font-medium mb-1 text-primary">Zprávy</h4>
            <p className="text-3xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Nepřečtené zprávy</p>
          </Card>
        </div>
      </section>
      {/* Chart placeholder */}
      <section>
        <h3 className="text-lg font-medium mb-4 text-foreground">Přehled</h3>
        <div className="rounded-xl bg-card/80 border border-border/60 p-6 flex flex-col items-center justify-center min-h-[220px]">
          <span className="text-muted-foreground mb-2">
            (Graf brzy bude k dispozici)
          </span>
          <svg
            width="180"
            height="80"
            viewBox="0 0 180 80"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="0"
              y="0"
              width="180"
              height="80"
              rx="12"
              fill="var(--muted)"
            />
            <polyline
              points="10,70 40,40 70,50 100,20 130,30 160,10"
              stroke="var(--primary)"
              strokeWidth="3"
              fill="none"
            />
            <circle cx="160" cy="10" r="4" fill="var(--primary)" />
          </svg>
        </div>
      </section>
    </>
  );
}
