import React from "react";
import { Sidebar } from "@/components/sidebar";
import { Separator } from "./ui/separator";

export function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div className="flex h-full w-full">
        <div className="max-w-[200px] w-full h-[100vh] border">
          <Sidebar />
        </div>
        <div className="w-full h-full">
          <div className="flex h-[52px] items-center justify-center"></div>
          <Separator />
          <div className="m-2">{children}</div>
        </div>
      </div>
    </>
  );
}
