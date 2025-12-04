import { api } from "./client";
import { normalizeCategory, normalizeStatus } from "../utils/normalizeLead";

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

  leads = leads.map((lead) => ({
    ...lead,
    category: normalizeCategory(lead.category),
    status: normalizeStatus(lead.status),
  }));

  return { leads, pagination };
}

export async function getAllLeads() {
  const res = await api.get("/leads", {
    params: {
      page: 1,
      limit: 999999,
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

export async function getLeadDetail(id) {
  const res = await api.get(`/leads/${id}`);

  const lead = res.data.data.lead;

  return {
    ...lead,
    category: normalizeCategory(lead.category),
    status: normalizeStatus(lead.status),
  };
}
