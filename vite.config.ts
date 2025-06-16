import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import type { AliasOptions } from "vite";
import { defineConfig } from "vite";

const root = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/memory-game/",
  resolve: {
    alias: {
      "@": root,
    } as AliasOptions,
  },
  server: {
    allowedHosts: [".ngrok-free.app"],
  },
});
