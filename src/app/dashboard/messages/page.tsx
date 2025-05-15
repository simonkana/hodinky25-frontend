import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
};

export default function MessagesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <p className="text-muted-foreground">
        This is the Messages page. Add your messaging UI here.
      </p>
    </div>
  );
}
