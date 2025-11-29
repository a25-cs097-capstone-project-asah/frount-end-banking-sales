import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { toggleTheme } from "../theme";

import { getLeads } from "../api/leads";
import { getDashboardStats } from "../api/dashboard";
import { normalizeStatus } from "../utils/normalizeLead";
import { fetchPhoneForLeads } from "../utils/fetchPhone";

import LeadsHeader from "../components/leads/LeadsHeader";
import LeadsFilterBar from "../components/leads/LeadsFilterBar";
import LeadsStats from "../components/leads/LeadsStats";
import LeadsTable from "../components/leads/LeadsTable";

const FollowUp = () => {
  const navigate = useNavigate();

  // THEME
  const [isLight, setIsLight] = useState(() =>
    document.documentElement.classList.contains("light")
  );

  const handleToggleTheme = () => {
    toggleTheme();
    setIsLight((prev) => !prev);
  };

  // DATA STATE
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // 🔥 Stats dari backend
  const [stats, setStats] = useState({
    totalLeads: 0,
    highPriorityLeads: 0,
    averageScore: 0,
    followUpLeads: 0,
  });

  // FILTER STATE
  const [search, setSearch] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");

  // ======================================================
  // 🔥 FETCH FOLLOW-UP LEADS
  // ======================================================
  const fetchFollowUps = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const { leads } = await getLeads({
        page: 1,
        limit: 2000,
        status: "follow-up",
      });

      const normalized = leads.map((l) => ({
        ...l,
        status: normalizeStatus(l.status),
      }));

      const leadsWithPhone = await fetchPhoneForLeads(normalized);
      setLeads(leadsWithPhone);
    } catch (err) {
      console.error(err);
      setErrorMsg("Gagal mengambil data follow up.");
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // 🔥 FETCH GLOBAL STATS (/dashboard/stats)
  // ======================================================
  const loadStats = async () => {
    try {
      const s = await getDashboardStats();
      setStats({
        totalLeads: s.totalLeads ?? 0,
        highPriorityLeads: s.highPriorityLeads ?? 0,
        averageScore: s.averageScore ?? 0,
        followUpLeads: s.followUpLeads ?? 0,
      });
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  useEffect(() => {
    fetchFollowUps();
    loadStats();
  }, []);

  // ======================================================
  // FILTERING
  // ======================================================
  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // SCORE (aturan baru)
    result = result.filter((lead) => {
      const s = Number(lead.probabilityScore) || 0;

      if (scoreFilter === "high") return s >= 80;
      if (scoreFilter === "medium") return s >= 60 && s < 80;
      if (scoreFilter === "low") return s < 60;

      return true;
    });

    // AGE
    result = result.filter((lead) => {
      const age = Number(lead.age) || 0;
      if (ageFilter === "young") return age < 30;
      if (ageFilter === "middle") return age >= 30 && age <= 50;
      if (ageFilter === "senior") return age > 50;
      return true;
    });

    // JOB
    if (jobFilter !== "all") {
      result = result.filter((lead) => lead.job === jobFilter);
    }

    // SEARCH
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.phone?.toLowerCase().includes(q) ||
          l.job?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [leads, search, scoreFilter, ageFilter, jobFilter]);

  // JOB DROPDOWN OPTIONS
  const jobOptions = useMemo(() => {
    const set = new Set();
    leads.forEach((l) => l.job && set.add(l.job));
    return [...set].sort();
  }, [leads]);

  return (
    <>
      <LeadsHeader
        title="Follow Up"
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
          onRefresh={fetchFollowUps}
        />

        {/* 🔥 Semua angka dari backend */}
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
          <LeadsTable
            leads={filteredLeads}
            getScoreCategory={(s) =>
              s >= 85 ? "high" : s >= 70 ? "medium" : "low"
            }
            formatStatusLabel={(s) => s}
            onRowClick={(l) => navigate(`/leads/${l.id}`)}
          />
        )}
      </div>
    </>
  );
};

export default FollowUp;
