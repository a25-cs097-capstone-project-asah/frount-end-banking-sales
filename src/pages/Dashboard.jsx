import React, { useEffect, useState } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import ConversionChart from "../components/dashboard/ConversionChart";
import ScoreDistributionChart from "../components/dashboard/ScoreDistributionChart";
import PriorityLeads from "../components/dashboard/PriorityLeads";
import ActivityList from "../components/dashboard/ActivityList";

import {
  getDashboardStats,
  getDashboardCharts,
  getPriorityLeads,
} from "../api/dashboard";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [convertionTrend, setConvertionTrend] = useState([]);
  const [distributionStats, setDistributionStats] = useState([]);
  const [priorityLeads, setPriorityLeadsState] = useState([]);
  const [activities, setActivities] = useState([]); // sementara kosong

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const token = localStorage.getItem("accessToken");
        if (!token) {
          setErrorMsg("Token tidak ditemukan. Silakan login ulang.");
          return;
        }

        // Karena api client sudah otomatis kirim Authorization dari localStorage,
        // kita cukup panggil service saja:

        const [statsData, chartsData, priorityData] = await Promise.all([
          getDashboardStats(),
          getDashboardCharts(7),
          getPriorityLeads(5),
        ]);

        setStats(statsData);
        setConvertionTrend(chartsData.convertionTrend || []);
        setDistributionStats(chartsData.distributionStats || []);
        setPriorityLeadsState(priorityData || []);

        // Activities belum ada di backend → kosong dulu
        setActivities([]);
      } catch (err) {
        console.error("Dashboard load error:", err);
        setErrorMsg(
          err?.response?.data?.message ||
            "Terjadi kegagalan pada server kami saat memuat dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <>
        <DashboardHeader />
        <div className="dashboard-content">
          <p>Memuat data dashboard...</p>
        </div>
      </>
    );
  }

  if (errorMsg) {
    return (
      <>
        <DashboardHeader />
        <div className="dashboard-content">
          <p style={{ color: "#f87171" }}>{errorMsg}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardHeader />

      <div className="dashboard-content">
        {/* Stats dari backend */}
        {stats && <StatsGrid stats={stats} />}

        <div className="charts-row">
          {/* Conversion chart pakai convertionTrend dari backend */}
          <ConversionChart conversionTrend={convertionTrend} />

          {/* Score distribution chart pakai distributionStats dari backend */}
          <ScoreDistributionChart scoreDistribution={distributionStats} />
        </div>

        <div className="bottom-section">
          {/* Priority leads dari /dashboard/priority-leads */}
          <PriorityLeads priorityLeads={priorityLeads} />

          {/* Activities sementara kosong */}
          <ActivityList activities={activities} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
