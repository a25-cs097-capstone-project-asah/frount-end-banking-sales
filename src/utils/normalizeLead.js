export function normalizeStatus(status) {
  if (!status) return status;

  const s = status.toString().toLowerCase();

  const map = {
    "follow-up": "Follow Up",
    "follow up": "Follow Up",
    followup: "Follow Up",
    contacted: "Contacted",
    new: "New",
    converted: "Converted",
    rejected: "Rejected",
  };

  return map[s] || status;
}

// Normalisasi CATEGORY
export function normalizeCategory(category) {
  if (!category) return category;

  const s = category.toString().toLowerCase();

  const map = {
    high: "Tinggi",
    medium: "Sedang",
    low: "Rendah",
  };

  return map[s] || category;
}
