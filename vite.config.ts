import { defineConfig } from "vite";
import type { AliasOptions } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
//@ts-ignore
import path from "path";

//@ts-ignore
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
