import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listings",
};

export default function ListingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inzeráty</h1>
      <p className="text-muted-foreground">
        Toto je stránka s vašimi inzeráty. Spravujte zde své nabídky hodinek.
      </p>
    </div>
  );
}
