"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/router";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavProps {
  links: {
    title: string;
    icon: LucideIcon;
    link: string;
  }[];
}

export function Nav({ links }: NavProps) {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.link}
            className={cn(
              buttonVariants({
                variant: router.pathname === link.link ? "default" : "ghost",
                size: "sm",
              }),
              router.pathname === link.link &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start"
            )}
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
