import React from "react";
import ReactDOM from "react-dom/client";
import { SingleProduct } from "./SingleProduct.js";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("single-product-div")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SingleProduct />
    </QueryClientProvider>
  </React.StrictMode>
);
