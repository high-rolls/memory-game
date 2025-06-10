import { createContext, useContext, useState } from "react";
import type { IconTheme } from "@/lib/themes";

export const IconThemeContext = createContext<{
  iconTheme: IconTheme;
  setIconTheme: (_: IconTheme) => void;
}>({
  iconTheme: "animals",
  setIconTheme: (_: IconTheme) => {},
});

export function useIconTheme() {
  return useContext(IconThemeContext);
}

export function IconThemeProvider({ children }: { children: React.ReactNode }) {
  const [iconTheme, setIconTheme] = useState<IconTheme>("animals");

  return (
    <IconThemeContext value={{ iconTheme, setIconTheme }}>
      {children}
    </IconThemeContext>
  );
}
