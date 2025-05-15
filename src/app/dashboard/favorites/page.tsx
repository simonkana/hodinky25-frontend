import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites",
};

export default function FavoritesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      <p className="text-muted-foreground">
        This is the Favorites page. Add your favorites UI here.
      </p>
    </div>
  );
}
