import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hodinky25Logo } from "@/components/ui/hodinky25-logo";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-muted to-background items-center justify-center relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-2xl animate-pulse z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[180px] bg-primary/30 rounded-full blur-2xl animate-pulse z-0" />

      <main className="relative z-10 flex flex-col items-center justify-center px-4 py-24 w-full max-w-2xl">
        <Hodinky25Logo className="mb-8 text-4xl md:text-5xl" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 tracking-tight animate-fade-in">
          <span className="text-foreground/80">Vstupte do světa hodinek</span>{" "}
          <span className="text-primary">s Hodinky25</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center mb-8 animate-fade-in delay-100">
          Stylové tržiště pro sběratele i nadšence. Nakupujte, prodávejte a
          spravujte své hodinky bezpečně a s přehledem.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center animate-fade-in delay-200">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto animate-bounce-once"
          >
            <Link href="/auth/register">Začít zdarma</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/auth/login">Přihlásit se</Link>
          </Button>
        </div>
      </main>
      {/* Animations moved to globals.css */}
    </div>
  );
}
