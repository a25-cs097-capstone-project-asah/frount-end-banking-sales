import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import LeadDetail from "./pages/LeadDetail";
import Layout from "./components/Layout";

import PriorityLeads from "./pages/PriorityLeads";
import FollowUp from "./pages/FollowUp";
import Analytics from "./pages/Analytics";
import History from "./pages/History";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* Publik */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Private → HARUS login */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/leads/:id" element={<LeadDetail />} />

        {/* menu kiri */}
        <Route path="/priority" element={<PriorityLeads />} />
        <Route path="/follow-up" element={<FollowUp />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/history" element={<History />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
