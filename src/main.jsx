import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App/App.jsx";
import { applyBrand } from "./config/brand.js"; // NEW

applyBrand(); // NEW — sets document title from the brand config

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
