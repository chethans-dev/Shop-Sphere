import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      // Proxy API requests
      "/api": {
        target: "http://192.168.192.24:3000", // Your backend URL
      },
    },
  },
});
