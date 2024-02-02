"use client";
import * as React from "react";
import { Inbox } from "lucide-react";

import { Nav } from "@/components/nav";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Sidebar() {
  return (
    <>
      <TooltipProvider delayDuration={0}>
        {" "}
        <div className="flex h-[52px] items-center justify-center w-full">
          <div className="relative z-20 flex items-center text-sm font-medium px-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            INDOVSK AGROINDUSTRIES
          </div>
        </div>
        <Separator />
        <Nav
          links={[
            {
              title: "Dashboard",
              icon: Inbox,
              link: "/dashboard",
            },
            {
              title: "Catalogue",
              icon: Inbox,
              link: "/catalogue",
            },
            {
              title: "Orders",
              icon: Inbox,
              link: "/orders",
            },
            {
              title: "Customer Details",
              icon: Inbox,
              link: "/customer-details",
            },
            {
              title: "Reports",
              icon: Inbox,
              link: "/reports",
            },
          ]}
        />
      </TooltipProvider>
    </>
  );
}
