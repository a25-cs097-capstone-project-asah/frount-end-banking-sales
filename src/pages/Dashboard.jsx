import React, { useEffect, useState } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import ConversionChart from "../components/dashboard/ConversionChart";
import ScoreDistributionChart from "../components/dashboard/ScoreDistributionChart";
import PriorityLeads from "../components/dashboard/PriorityLeads";
import ActivityList from "../components/dashboard/InteractionHistory";

import {
  getDashboardStats,
  getDashboardCharts,
  getPriorityLeads,
} from "../api/dashboard";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [conversionTrend, setConversionTrend] = useState([]);
  const [distributionStats, setDistributionStats] = useState([]);
  const [priorityLeads, setPriorityLeadsState] = useState([]);
  const [activities, setActivities] = useState([]);

  const [chartDays, setChartDays] = useState(7);

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

        // Ambil semua data paralel berdasarkan periode grafik
        const [statsData, chartsData, priorityData] = await Promise.all([
          getDashboardStats(),
          getDashboardCharts(chartDays),
          getPriorityLeads(5),
        ]);

        // ---- 1️⃣ Stats utama (backend) ----
        setStats({
          totalLeads: statsData.totalLeads ?? 0,
          convertedLeads: statsData.convertedLeads ?? 0,
          highPriorityLeads: statsData.highPriorityLeads ?? 0,
          conversionRate: statsData.conversionRate ?? 0,
          averageScore: statsData.averageScore ?? 0,
        });

        // ---- 2️⃣ Fix typo backend convertionTrend ----
        setConversionTrend(
          chartsData.conversionTrend || chartsData.convertionTrend || []
        );

        // ---- 3️⃣ Score Distribution ----
        setDistributionStats(chartsData.distributionStats || []);

        // ---- 4️⃣ Priority Leads ----
        setPriorityLeadsState(priorityData || []);

        // ---- 5️⃣ Aktivitas → belum ada API ----
        setActivities([]);
      } catch (err) {
        console.error("Dashboard load error:", err);
        setErrorMsg(
          err?.response?.data?.message ||
            "Terjadi masalah saat memuat dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [chartDays]);

  // ==================== LOADING ====================
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

  // ==================== ERROR ====================
  if (errorMsg) {
    return (
      <>
        <DashboardHeader />
        <div className="dashboard-content">
          <p style={{ color: "#ef4444" }}>{errorMsg}</p>
        </div>
      </>
    );
  }

  // ==================== SUCCESS ====================
  return (
    <>
      <DashboardHeader />

      <div className="dashboard-content">
        {/* Stats Box */}
        {stats && <StatsGrid stats={stats} />}

        <div className="charts-row">
          {/* Grafik Konversi */}
          <ConversionChart
            conversionTrend={conversionTrend}
            period={chartDays}
            onChangePeriod={setChartDays}
          />

          <ScoreDistributionChart scoreDistribution={distributionStats} />
        </div>

        <div className="bottom-section">
          <PriorityLeads priorityLeads={priorityLeads} />
          <ActivityList activities={activities} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
