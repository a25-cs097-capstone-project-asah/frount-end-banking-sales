import { api } from "./client";
import { normalizeCategory, normalizeStatus } from "../utils/normalizeLead";

// Ambil daftar leads dengan pagination & filter dasar
export async function getLeads({
  page = 1,
  limit = 10,
  sortBy = "probability_score",
  order = "DESC",
  category,
  status,
  job,
  minScore,
  maxScore,
  search,
} = {}) {
  const res = await api.get("/leads", {
    params: {
      page,
      limit,
      sortBy,
      order,
      category,
      status,
      job,
      minScore,
      maxScore,
      search,
    },
  });

  let { leads, pagination } = res.data.data;

  // 🔥 NORMALISASI Wajib!
  leads = leads.map((lead) => ({
    ...lead,
    category: normalizeCategory(lead.category),
    status: normalizeStatus(lead.status),
  }));

  return { leads, pagination };
}

// Detail satu lead
export async function getLeadDetail(id) {
  const res = await api.get(`/leads/${id}`);

  const lead = res.data.data.lead;

  // Normalisasi detail lead juga
  return {
    ...lead,
    category: normalizeCategory(lead.category),
    status: normalizeStatus(lead.status),
  };
}
