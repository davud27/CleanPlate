import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/analyzeFoodProduct": {
        target: "https://analyzefoodproduct-cmx325nlca-uc.a.run.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/analyzeFoodProduct/, ""),
      },
      "/api/getFoodCertifications": {
        target: "https://getfoodcertifications-cmx325nlca-uc.a.run.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/getFoodCertifications/, ""),
      },
    },
  },
});
