import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Code-split the two experiences so the portfolio doesn't load the game bundle
// (and the game doesn't load the portfolio's three.js).
const App = lazy(() => import("./App.jsx"));
const ClimbExperience = lazy(() => import("./climb/ClimbExperience.jsx"));

const loader = (
  <div className="flex min-h-screen items-center justify-center bg-[#f5f4f2] dark:bg-[#1a1a1a]">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-300 border-t-purple-500" />
  </div>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={loader}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/climb" element={<ClimbExperience />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
