import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { toggleTheme } from "../theme";
import { api } from "../api/client";
import { exportToCSV } from "../utils/exportToCSV";

import LeadsHeader from "../components/leads/LeadsHeader";
import LeadsFilterBar from "../components/leads/LeadsFilterBar";
import LeadsStats from "../components/leads/LeadsStats";
import LeadsTable from "../components/leads/LeadsTable";
import LeadsPagination from "../components/leads/LeadsPagination";

import { fetchPhoneForLeads } from "../utils/fetchPhone";

import { getDashboardStats } from "../api/dashboard";

const PriorityLeads = () => {
  const navigate = useNavigate();

  const [isLight, setIsLight] = useState(() =>
    document.documentElement.classList.contains("light")
  );

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [stats, setStats] = useState({
    totalLeads: 0,
    highPriorityLeads: 0,
    averageScore: 0,
    followUpLeads: 0,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalLeads: 0,
  });

  // FILTER
  const [search, setSearch] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");

  const limit = 10;

  const handleToggleTheme = () => {
    toggleTheme();
    setIsLight((prev) => !prev);
  };

  const fetchPriority = async (page = 1) => {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await api.get("/leads/priority-leads", {
        params: { page, limit },
      });

      const { leads, pagination } = res.data.data;
      const withPhone = await fetchPhoneForLeads(leads);

      setLeads(withPhone);
      setPagination(pagination);
    } catch (err) {
      console.error(err);
      setErrorMsg("Gagal mengambil data prioritas tinggi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriority(1);
  }, []);

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
        console.error("Failed to load stats:", err);
      }
    };

    loadStats();
  }, []);

  const filteredLeads = useMemo(() => {
    let result = [...leads];
    const q = search.toLowerCase();

    if (search.trim()) {
      result = result.filter(
        (l) =>
          l.name?.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.phone?.toLowerCase().includes(q) ||
          l.job?.toLowerCase().includes(q)
      );
    }

    // SCORE
    result = result.filter((lead) => {
      const s = Number(lead.probabilityScore) || 0;

      if (scoreFilter === "high") return s >= 80;
      if (scoreFilter === "medium") return s >= 60 && s < 80;
      if (scoreFilter === "low") return s < 60;

      return true;
    });

    // Age
    result = result.filter((lead) => {
      const age = Number(lead.age) || 0;
      if (ageFilter === "young") return age < 30;
      if (ageFilter === "middle") return age >= 30 && age <= 50;
      if (ageFilter === "senior") return age > 50;
      return true;
    });

    // Job
    if (jobFilter !== "all") {
      result = result.filter((lead) => lead.job === jobFilter);
    }

    return result;
  }, [leads, search, scoreFilter, ageFilter, jobFilter]);

  // OPTIONS
  const jobOptions = useMemo(() => {
    const set = new Set();
    leads.forEach((l) => l.job && set.add(l.job));
    return [...set].sort();
  }, [leads]);

  return (
    <>
      <LeadsHeader
        title="Prioritas Tinggi"
        search={search}
        onSearchChange={setSearch}
        onToggleTheme={handleToggleTheme}
        isLight={isLight}
      />

      <div className="leads-content">
        <LeadsFilterBar
          scoreFilter={scoreFilter}
          setScoreFilter={setScoreFilter}
          ageFilter={ageFilter}
          setAgeFilter={setAgeFilter}
          jobFilter={jobFilter}
          setJobFilter={setJobFilter}
          jobOptions={jobOptions}
          hideStatusFilter
          hideViewSwitcher
          onRefresh={() => fetchPriority(pagination.page)}
          onExport={() =>
            exportToCSV(
              filteredLeads,
              `priority-leads-page-${pagination.page}.csv`
            )
          }
        />

        <LeadsStats
          totalLeads={stats.totalLeads}
          highPriorityLeads={stats.highPriorityLeads}
          avgScore={stats.averageScore}
          followUpToday={stats.followUpLeads}
        />

        {loading ? (
          <p>Memuat data...</p>
        ) : errorMsg ? (
          <p style={{ color: "red" }}>{errorMsg}</p>
        ) : (
          <>
            <LeadsTable
              leads={filteredLeads}
              getScoreCategory={(s) =>
                s >= 85 ? "high" : s >= 70 ? "medium" : "low"
              }
              formatStatusLabel={(s) => s}
              onRowClick={(lead) => navigate(`/leads/${lead.id}`)}
            />

            <LeadsPagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={(p) => fetchPriority(p)}
            />
          </>
        )}
      </div>
    </>
  );
};

export default PriorityLeads;
