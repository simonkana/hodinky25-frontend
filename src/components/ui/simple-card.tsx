import React from "react";

interface SimpleCardProps {
  children: React.ReactNode;
}

export function SimpleCard({ children }: SimpleCardProps) {
  return (
    <div className="w-full max-w-md space-y-8 rounded-2xl border border-border/70 bg-card p-10 shadow-[var(--shadow)] dark:shadow-[var(--shadow-dark)] backdrop-blur-[8px] transition-shadow duration-200 hover:shadow-2xl">
      {children}
    </div>
  );
}
