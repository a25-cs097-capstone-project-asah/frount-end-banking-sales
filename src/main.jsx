import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// === Import CSS Yang Sudah Dipisah ===
import "./styles/Layout/base.css";
import "./styles/Layout/sidebar-dark.css";
import "./styles/Layout/sidebar-light.css";
import "./styles/landing.css";
import "./styles/login/login-base.css";
import "./styles/login/login-dark.css";
import "./styles/login/login-light.css";
import "./styles/dashboard/dashboard.css";
import "./styles/dashboard/theme-dark.css";
import "./styles/dashboard/theme-light.css";
import "./styles/leads/leads-dark.css";
import "./styles/leads/leads-light.css";
import "./styles/lead-detail/lead-detail-base.css";
import "./styles/lead-detail/lead-detail-dark.css";
import "./styles/lead-detail/lead-detail-light.css";
import "./styles/history.css";
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
