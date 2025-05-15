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
import { SimpleCard } from "@/components/ui/simple-card";
import { API_BASE } from "@/lib/api";
import { Hodinky25Logo } from "@/components/ui/hodinky25-logo";

const formSchema = z
  .object({
    username: z.string().min(1, {
      message: "Uživatelské jméno je povinné.",
    }),
    email: z.string().email({
      message: "Zadejte platnou e-mailovou adresu.",
    }),
    password: z.string().min(6, {
      message: "Heslo musí mít alespoň 6 znaků.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Zadejte znovu heslo pro potvrzení.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hesla se neshodují",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { confirmPassword, ...registrationData } = values;

      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registrace selhala");
      }

      toast.success("Váš účet byl úspěšně vytvořen!");

      // Redirect to login
      router.push("/auth/login");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="absolute top-8 left-0 right-0 flex justify-center z-10">
        <Hodinky25Logo />
      </div>
      <SimpleCard>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Vytvořit účet</h1>
          <p className="text-muted-foreground">Zadejte své údaje a začněte</p>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
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
                  <FormLabel>Heslo</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Potvrzení hesla</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Zaregistrovat se
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Už máte účet?{" "}
          <Link href="/auth/login" className="underline hover:text-primary">
            Přihlaste se
          </Link>
        </p>
      </SimpleCard>
    </div>
  );
}
