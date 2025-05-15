"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useEffect } from "react";
import { SimpleCard } from "@/components/ui/simple-card";
import { API_BASE } from "@/lib/api";
import { Hodinky25Logo } from "@/components/ui/hodinky25-logo";

const formSchema = z.object({
  username: z.string().min(1, "Uživatelské jméno je povinné"),
  password: z.string().min(1, "Heslo je povinné"),
});

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Přihlášení se nezdařilo");
      }

      const data = await response.json();

      // Store the token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      toast.success("Byli jste úspěšně přihlášeni!");

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      toast.error("Nesprávné přihlašovací údaje. Zkuste to prosím znovu.");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="absolute top-8 left-0 right-0 flex justify-center z-10">
        <Hodinky25Logo />
      </div>
      <SimpleCard>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Vítejte zpět</h1>
          <p className="text-muted-foreground">
            Zadejte své přihlašovací údaje
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uživatelské jméno</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Heslo</FormLabel>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Zapomněli jste heslo?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Přihlásit se
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Nemáte účet?{" "}
          <Link href="/auth/register" className="underline hover:text-primary">
            Zaregistrujte se
          </Link>
        </p>
      </SimpleCard>
    </div>
  );
}
