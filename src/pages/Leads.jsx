import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import { getLeads } from "../api/leads";
import { api } from "../api/client";
import { getDashboardStats } from "../api/dashboard";

import LeadsHeader from "../components/leads/LeadsHeader";
import LeadsFilterBar from "../components/leads/LeadsFilterBar";
import LeadsStats from "../components/leads/LeadsStats";
import LeadsTable from "../components/leads/LeadsTable";
import LeadsGrid from "../components/leads/LeadsGrid";
import LeadsPagination from "../components/leads/LeadsPagination";

import { normalizeStatus } from "../utils/normalizeLead";
import { fetchPhoneForLeads } from "../utils/fetchPhone";

const Leads = () => {
  const navigate = useNavigate();

  /* ---------------------------------------------------------
     STATE
  --------------------------------------------------------- */
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalLeads: 0,
  });

  // Stats dari /dashboard/stats
  const [stats, setStats] = useState({
    totalLeads: 0,
    highPriorityLeads: 0,
    averageScore: 0,
    followUpLeads: 0,
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const [view, setView] = useState("table");
  const limit = 10;

  /* ---------------------------------------------------------
     OPTIONS (Dropdown)
  --------------------------------------------------------- */
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

  /* ---------------------------------------------------------
     SCORE CATEGORY (80 = high, 60 = medium)
  --------------------------------------------------------- */
  const getScoreCategory = (score) => {
    if (score >= 80) return "high";
    if (score >= 60) return "medium";
    return "low";
  };

  /* ---------------------------------------------------------
     SORTING
  --------------------------------------------------------- */
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  /* ---------------------------------------------------------
     ROW CLICK
  --------------------------------------------------------- */
  const handleRowClick = (lead) => {
    const id = lead.id || lead.lead_id;
    if (id) navigate(`/leads/${id}`);
  };

  /* ---------------------------------------------------------
     UPDATE LEAD STATUS
  --------------------------------------------------------- */
  const handleStatusChange = async (lead, newStatus) => {
    const id = lead.id || lead.lead_id;

    try {
      await api.put(`/leads/${id}/status`, { status: newStatus });

      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
      );
    } catch (err) {
      console.error("Update status error:", err);
      alert("Gagal mengubah status lead.");
    }
  };

  /* ---------------------------------------------------------
     EXPORT EXCEL
  --------------------------------------------------------- */
  const handleExportExcel = () => {
    const exportData = filteredLeads.map((l) => ({
      Nama: l.name,
      Email: l.email,
      Telepon: l.phone,
      Pekerjaan: l.job,
      Skor: `${l.probabilityScore}%`,
      Status: l.status,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, `leads_page_${pagination.page}.xlsx`);
  };

  /* ---------------------------------------------------------
     FETCH LEADS (Pagination + Phone Patch)
  --------------------------------------------------------- */
  const fetchLeads = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        setErrorMsg("");

        const res = await getLeads({ page, limit });

        const normalized = res.leads.map((l) => ({
          ...l,
          status: normalizeStatus(l.status),
        }));

        const enriched = await fetchPhoneForLeads(normalized);

        setLeads(enriched);
        setPagination(res.pagination);
      } catch (err) {
        console.error("Fetch leads error:", err);
        setErrorMsg("Gagal mengambil data leads.");
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  useEffect(() => {
    fetchLeads(1);
  }, [fetchLeads]);

  /* ---------------------------------------------------------
     FETCH GLOBAL STATS (dari /dashboard/stats)
  --------------------------------------------------------- */
  useEffect(() => {
    const loadStats = async () => {
      try {
        const s = await getDashboardStats();
        setStats({
          totalLeads: s.totalLeads ?? 0,
          highPriorityLeads: s.highPriorityLeads ?? 0,
          averageScore: s.averageScore ?? 0,
          followUpLeads: s.followUpLeads ?? 0,
        });
      } catch (err) {
        console.error("Load stats error:", err);
      }
    };

    loadStats();
  }, []);

  /* ---------------------------------------------------------
     FILTERING
  --------------------------------------------------------- */
  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.name?.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.phone?.toLowerCase().includes(q)
      );
    }

    // Status
    if (statusFilter !== "all") {
      result = result.filter((l) => l.status === statusFilter);
    }

    // Job
    if (jobFilter !== "all") {
      result = result.filter((l) => l.job === jobFilter);
    }

    // Score
    if (scoreFilter !== "all") {
      result = result.filter(
        (l) => getScoreCategory(Number(l.probabilityScore)) === scoreFilter
      );
    }

    // Sorting
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
  }, [leads, search, scoreFilter, jobFilter, statusFilter, sortField, sortDir]);

  const formatStatusLabel = (s) =>
    !s ? "-" : s.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());

  /* ---------------------------------------------------------
     RENDER
  --------------------------------------------------------- */
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
          onRefresh={() => fetchLeads(pagination.page)}
          onExport={handleExportExcel}
        />

        {/* Stats global dari /dashboard/stats */}
        <LeadsStats
          totalLeads={stats.totalLeads}
          highPriorityLeads={stats.highPriorityLeads}
          avgScore={stats.averageScore}
          followUpToday={stats.followUpLeads}
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
            onRowClick={handleRowClick}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <LeadsGrid
            leads={filteredLeads}
            getScoreCategory={getScoreCategory}
            formatStatusLabel={formatStatusLabel}
            onCardClick={handleRowClick}
          />
        )}

        <LeadsPagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={(p) => fetchLeads(p)}
        />
      </div>
    </>
  );
};

export default Leads;
