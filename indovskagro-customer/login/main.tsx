import React from "react";
import ReactDOM from "react-dom/client";
import { LoginForm } from "./login-form";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("login-form")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>
  </React.StrictMode>
);
