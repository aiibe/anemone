import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const API_URL = "http://localhost:8080";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: API_URL,
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: "../back/dist",
    },
  };
});
