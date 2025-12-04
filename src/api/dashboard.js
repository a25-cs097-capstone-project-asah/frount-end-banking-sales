import { api } from "./client";

// 📌 GET /dashboard/stats
export async function getDashboardStats() {
  const res = await api.get("/dashboard/stats");

  return (
    res.data?.data?.stats || {
      totalLeads: 0,
      convertedLeads: 0,
      highPriorityLeads: 0,
      convertionRate: 0,
      averageScore: 0,
      followUpLeads: 0,
    }
  );
}

// 📌 GET /dashboard/charts?days=7
export async function getDashboardCharts(days = 7) {
  const res = await api.get("/dashboard/charts", {
    params: { days },
  });

  const data = res.data?.data || {};

  return {
    convertionTrend: data.convertionTrend || [],
    distributionStats: data.distributionStats || [],
  };
}

// 📌 GET /leads/priority-leads?limit=5
export async function getPriorityLeads(limit = 5) {
  const res = await api.get("/leads/priority-leads", {
    params: { limit },
  });

  return res.data?.data?.leads || [];
}
