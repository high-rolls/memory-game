import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import MainMenu from "@/routes/main-menu";
import Play from "@/routes/play";
import { IconThemeContext } from "./context/icon-theme-context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <IconThemeContext value="animals">
          <Route path="memory-game">
            <Route index element={<MainMenu />} />
            <Route path="play" element={<Play />} />
          </Route>
        </IconThemeContext>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
