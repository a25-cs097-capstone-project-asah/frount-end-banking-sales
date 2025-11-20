import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// === Import CSS Yang Sudah Dipisah ===
import "./styles/base.css";
import "./styles/landing.css";
import "./styles/auth.css";
import "./styles/dashboard.css";
import "./styles/leads.css";
import "./styles/lead-detail.css";
import "./styles/responsive.css";
// =====================================

import { AuthProvider } from "./context/AuthContext";
import { initTheme } from "./theme";

// Inisialisasi theme sebelum render React
initTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
