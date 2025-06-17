import MainMenu from "@/routes/main-menu";
import MemoryGameLayout from "@/routes/memory-game-layout";
import Play from "@/routes/play";
import Scores from "@/routes/scores";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, HashRouter as Router, Routes } from "react-router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route element={<MemoryGameLayout />}>
          <Route index element={<Play />} />
          <Route path="/settings" element={<MainMenu />} />
          <Route path="/scores" element={<Scores />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
