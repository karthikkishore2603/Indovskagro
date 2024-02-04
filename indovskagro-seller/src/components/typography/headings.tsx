import React from "react";

export function Heading1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {children}
    </h1>
  );
}
