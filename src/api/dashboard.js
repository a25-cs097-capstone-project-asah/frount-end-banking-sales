import { api } from "./client";

// =========================
// 📌 GET /dashboard/stats
// =========================
export async function getDashboardStats() {
  const res = await api.get("/dashboard/stats");
  // backend response: { status: 'success', data: { stats } }
  return res.data.data.stats;
}

// =====================================
// 📌 GET /dashboard/charts?days=7
// =====================================
export async function getDashboardCharts(days = 7) {
  const res = await api.get("/dashboard/charts", {
    params: { days },
  });

  const { convertionTrend, distributionStats } = res.data.data;
  return { convertionTrend, distributionStats };
}

// ============================================================
// 📌 GET /leads/priority-leads?limit=5
// ⚠️ Ini yang tadinya salah (/dashboard/priority-leads)
// ============================================================
export async function getPriorityLeads(limit = 5) {
  const res = await api.get("/leads/priority-leads", {
    params: { limit },
  });
  // backend: { status: 'success', data: { leads } }
  return res.data.data.leads;
}
