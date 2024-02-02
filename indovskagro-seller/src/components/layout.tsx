import React from "react";
import { Sidebar } from "@/components/sidebar";

export function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div className="flex h-100 w-100">
        <div className="max-w-[200px] w-full h-[100vh] border">
          <Sidebar />
        </div>
        <div className="ml-2">
          <div className="flex h-[52px] items-center justify-center"></div>
          {children}
        </div>
      </div>
    </>
  );
}
