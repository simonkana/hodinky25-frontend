import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
};

export default function MessagesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Zprávy</h1>
      <p className="text-muted-foreground">
        Toto je stránka se zprávami. Komunikujte zde s ostatními uživateli.
      </p>
    </div>
  );
}
