import RootLayout from "@/layouts/root/root-layout";
import LevelSelect from "@/routes/level-select";
import Play from "@/routes/play";
import Scores from "@/routes/scores";
import Settings from "@/routes/settings";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, HashRouter as Router, Routes } from "react-router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<LevelSelect />} />
          <Route path="play" element={<Play />} />
          <Route path="settings" element={<Settings />} />
          <Route path="scores" element={<Scores />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
