import MainMenu from "@/routes/main-menu";
import Play from "@/routes/play";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router";
import "./index.css";
import MemoryGameLayout from "./routes/memory-game-layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route element={<MemoryGameLayout />}>
          <Route index element={<MainMenu />} />
          <Route path="play" element={<Play />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
