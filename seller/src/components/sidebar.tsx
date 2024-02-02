"use client";
import * as React from "react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  PenBox,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";

import { Nav } from "@/components/nav";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";

interface SidebarProps {
  defaultCollapsed?: boolean;
}

export function Sidebar({ defaultCollapsed = false }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Dashboard",
            icon: Inbox,
            variant: "default",
          },
          {
            title: "Catalogue",
            icon: Inbox,
            variant: "ghost",
          },
          {
            title: "Orders",
            icon: Inbox,
            variant: "ghost",
          },
          {
            title: "Customer Details",
            icon: Inbox,
            variant: "ghost",
          },
          {
            title: "Reports",
            icon: Inbox,
            variant: "ghost",
          },
                    
        ]}
      />
      <Separator />
    </TooltipProvider>
  );
}
