import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getLeads } from "../api/leads";

import LeadsHeader from "../components/leads/LeadsHeader";
import LeadsFilterBar from "../components/leads/LeadsFilterBar";
import LeadsStats from "../components/leads/LeadsStats";
import LeadsTable from "../components/leads/LeadsTable";
import LeadsGrid from "../components/leads/LeadsGrid";

import { normalizeStatus } from "../utils/normalizeLead";
import { fetchPhoneForLeads } from "../utils/fetchPhone";

const Leads = () => {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [search, setSearch] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const [view, setView] = useState("table");

  const jobOptions = useMemo(() => {
    const set = new Set();
    leads.forEach((l) => l.job && set.add(l.job));
    return [...set].sort();
  }, [leads]);

  const statusOptions = useMemo(() => {
    const set = new Set();
    leads.forEach((l) => l.status && set.add(l.status));
    return [...set].sort();
  }, [leads]);

  const getScoreCategory = (score) => {
    if (score >= 85) return "high";
    if (score >= 70) return "medium";
    return "low";
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const handleRowClick = (lead) => {
    const leadId = lead.id || lead.lead_id;
    if (leadId) navigate(`/leads/${leadId}`);
  };

  // FETCH LEADS + MERGE PHONE
  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const { leads } = await getLeads({ page: 1, limit: 2000 });

      const normalized = (leads || []).map((l) => ({
        ...l,
        status: normalizeStatus(l.status),
      }));

      const enriched = await fetchPhoneForLeads(normalized);

      setLeads(enriched);
    } catch (err) {
      console.error(err);
      setErrorMsg("Gagal mengambil data leads.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // FILTERING
  const filteredLeads = useMemo(() => {
    let result = [...leads];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.name?.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.phone?.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((l) => l.status === statusFilter);
    }

    if (jobFilter !== "all") {
      result = result.filter((l) => l.job === jobFilter);
    }

    if (scoreFilter !== "all") {
      result = result.filter(
        (l) => getScoreCategory(Number(l.probabilityScore)) === scoreFilter
      );
    }

    if (sortField) {
      result.sort((a, b) => {
        const A = a[sortField];
        const B = b[sortField];

        if (typeof A === "string")
          return sortDir === "asc" ? A.localeCompare(B) : B.localeCompare(A);

        if (typeof A === "number") return sortDir === "asc" ? A - B : B - A;

        return 0;
      });
    }

    return result;
  }, [leads, search, statusFilter, jobFilter, scoreFilter, sortField, sortDir]);

  const totalLeads = filteredLeads.length;
  const highPriorityLeads = filteredLeads.filter(
    (l) => getScoreCategory(Number(l.probabilityScore)) === "high"
  ).length;

  const avgScore =
    filteredLeads.length > 0
      ? Math.round(
          filteredLeads.reduce(
            (acc, l) => acc + Number(l.probabilityScore),
            0
          ) / filteredLeads.length
        )
      : 0;

  const followUpToday = filteredLeads.filter(
    (l) => l.status === "Follow Up"
  ).length;

  return (
    <>
      <LeadsHeader search={search} onSearchChange={setSearch} />

      <div className="leads-content">
        <LeadsFilterBar
          scoreFilter={scoreFilter}
          setScoreFilter={setScoreFilter}
          ageFilter={ageFilter}
          setAgeFilter={setAgeFilter}
          jobFilter={jobFilter}
          setJobFilter={setJobFilter}
          jobOptions={jobOptions}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          statusOptions={statusOptions}
          view={view}
          setView={setView}
          onRefresh={fetchLeads}
          onExport={() => {}}
        />

        <LeadsStats
          totalLeads={totalLeads}
          highPriorityLeads={highPriorityLeads}
          avgScore={avgScore}
          followUpToday={followUpToday}
        />

        {loading ? (
          <p>Memuat data leads...</p>
        ) : errorMsg ? (
          <p style={{ color: "red" }}>{errorMsg}</p>
        ) : view === "table" ? (
          <LeadsTable
            leads={filteredLeads}
            onSort={handleSort}
            getScoreCategory={getScoreCategory}
            formatStatusLabel={(s) => s}
            onRowClick={handleRowClick}
          />
        ) : (
          <LeadsGrid
            leads={filteredLeads}
            getScoreCategory={getScoreCategory}
            formatStatusLabel={(s) => s}
            onCardClick={handleRowClick}
          />
        )}
      </div>
    </>
  );
};

export default Leads;
