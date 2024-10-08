import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import vike from "vike/plugin";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const API_URL = `${env.VITE_API_URL ?? "http://localhost:3000"}`;

  return {
    plugins: [vike({}), react({})],
    resolve: {
      alias: {
        "@": new URL("./", import.meta.url).pathname,
      },
    },
    server: {
      proxy: {
        "/api": {
          target: API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
