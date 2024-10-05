import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        product: resolve(__dirname, "product/index.html"),
        login: resolve(__dirname, "login/index.html"),
        checkout: resolve(__dirname, "checkout/index.html"),
        register: resolve(__dirname, "register/index.html"),
        orderhistory: resolve(__dirname, "orderhistory/index.html"),
      },
    },
  },
  plugins: [react()],
});
