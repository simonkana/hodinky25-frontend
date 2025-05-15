import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites",
};

export default function FavoritesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Oblíbené</h1>
      <p className="text-muted-foreground">
        Toto je stránka s oblíbenými inzeráty. Najdete zde své uložené hodinky.
      </p>
    </div>
  );
}
