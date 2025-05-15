import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Nastavení</h1>
      <p className="text-muted-foreground">
        Toto je stránka s nastavením. Upravte zde své osobní údaje a preference.
      </p>
    </div>
  );
}
