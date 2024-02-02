import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // set fontSans variable on body element
    // add "min-h-screen bg-background font-sans antialiased"
    // to body element

    const body = document.querySelector("body");
    if (!body) return;

    body.className += ` ${cn(
      "min-h-screen bg-background font-sans antialiased",
      fontSans.variable
    )}`;

    return () => {
      body.className = body.className.replace(
        ` ${cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}`,
        ""
      );
    };
  }, []);

  return <Component {...pageProps} />;
}
