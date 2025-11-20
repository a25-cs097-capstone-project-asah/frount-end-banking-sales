import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import LeadDetail from "./pages/LeadDetail";
import Layout from "./components/Layout";

// halaman tambahan
import PriorityLeads from "./pages/PriorityLeads";
import FollowUp from "./pages/FollowUp";
import Analytics from "./pages/Analytics";
import History from "./pages/History";

const App = () => {
  return (
    <Routes>
      {/* Landing page publik */}
      <Route path="/" element={<Landing />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Halaman yang pakai sidebar & header */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/leads/:id" element={<LeadDetail />} />

        {/* route baru untuk menu kiri */}
        <Route path="/priority" element={<PriorityLeads />} />
        <Route path="/follow-up" element={<FollowUp />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/history" element={<History />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
