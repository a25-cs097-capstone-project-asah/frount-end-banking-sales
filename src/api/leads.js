import { api } from "./client";
import { normalizeCategory, normalizeStatus } from "../utils/normalizeLead";

/* ===================================================================
   1. GET LEADS WITH PAGINATION (DEFAULT)
   =================================================================== */
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

  // Normalize setiap lead
  leads = leads.map((lead) => ({
    ...lead,
    category: normalizeCategory(lead.category),
    status: normalizeStatus(lead.status),
  }));

  return { leads, pagination };
}

/* ===================================================================
   2. GET ALL LEADS (UNTUK EXPORT / FILTER BERDASARKAN KESELURUHAN)
      → Ambil semua leads dari backend (tanpa pagination)
   =================================================================== */
export async function getAllLeads() {
  const res = await api.get("/leads", {
    params: {
      page: 1,
      limit: 999999, // ambil semua
      sortBy: "probability_score",
      order: "DESC",
    },
  });

  let { leads } = res.data.data;

  return leads.map((lead) => ({
    ...lead,
    category: normalizeCategory(lead.category),
    status: normalizeStatus(lead.status),
  }));
}

/* ===================================================================
   3. GET LEAD DETAIL BY ID
   =================================================================== */
export async function getLeadDetail(id) {
  const res = await api.get(`/leads/${id}`);

  const lead = res.data.data.lead;

  return {
    ...lead,
    category: normalizeCategory(lead.category),
    status: normalizeStatus(lead.status),
  };
}
