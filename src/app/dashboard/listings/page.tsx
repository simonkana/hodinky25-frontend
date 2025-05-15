import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listings",
};

export default function ListingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Listings</h1>
      <p className="text-muted-foreground">
        This is the Listings page. Add your listings management UI here.
      </p>
    </div>
  );
}
