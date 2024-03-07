import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import  Myaccount from "./myaccount";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("myaccount")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Myaccount />
    </QueryClientProvider>
  </React.StrictMode>
);
