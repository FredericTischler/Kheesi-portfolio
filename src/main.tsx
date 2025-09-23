import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@/components/ThemeProvider";
import { App } from "@/App";

import "./styles/index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found");
}

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
