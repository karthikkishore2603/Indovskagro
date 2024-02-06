import React from "react";
import ReactDOM from "react-dom/client";
import ProductsShop from "./ProductsShop.js";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("products-section")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProductsShop />
    </QueryClientProvider>
  </React.StrictMode>
);
