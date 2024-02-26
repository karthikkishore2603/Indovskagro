import React from "react";
import ReactDOM from "react-dom/client";
import { RegisterForm } from "./register-form";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("register-form")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RegisterForm />
    </QueryClientProvider>
  </React.StrictMode>
);
