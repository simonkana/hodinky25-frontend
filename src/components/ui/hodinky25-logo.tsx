import React from "react";

export function Hodinky25Logo({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={
        "font-extrabold text-2xl tracking-tight text-primary select-none " +
        className
      }
      style={{
        fontFamily: "Geist, Inter, sans-serif",
        letterSpacing: "-0.03em",
      }}
      {...props}
    >
      <span className="text-foreground">hodinky</span>
      <span className="text-primary">25</span>
    </span>
  );
}
