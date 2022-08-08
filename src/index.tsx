import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./shared/colorTheme";
import { ThemeProvider } from "@mui/material/styles";
import { HashRouter as Router } from "react-router-dom";
import { Buffer as buffer } from "buffer";

global.Buffer = buffer; // @solana/spl-token Fix for raise error

const container = document.getElementById("root");
const root = createRoot(container!);

if (container) {
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </React.StrictMode>
  );
}
reportWebVitals();
