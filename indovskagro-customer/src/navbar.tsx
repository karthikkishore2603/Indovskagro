import React from "react";
import ReactDOM from "react-dom/client";
import NavbarCollapse from "./NavbarCollapse";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("navbar-cart")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NavbarCollapse />
    </QueryClientProvider>
  </React.StrictMode>
);
