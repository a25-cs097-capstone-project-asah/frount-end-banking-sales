import { api } from "../api/client";

export async function fetchPhoneForLeads(leads) {
  return await Promise.all(
    leads.map(async (lead) => {
      try {
        const res = await api.get(`/leads/${lead.id}`);
        const detail = res.data.data.lead;

        return {
          ...lead,
          phone: detail.phone || "-",
        };
      } catch {
        console.error(`Gagal ambil phone untuk lead ${lead.id}`);
        return { ...lead, phone: "-" };
      }
    })
  );
}
