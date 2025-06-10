// src/routes/MemoryGameLayout.tsx
import { Outlet } from "react-router";
import { IconThemeProvider } from "@/context/icon-theme-context";

export default function MemoryGameLayout() {
  return (
    <IconThemeProvider>
      <Outlet />
    </IconThemeProvider>
  );
}
