import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { leadsData as mockLeads } from "../data/leadsMock";

import LeadsHeader from "../components/leads/LeadsHeader";
import LeadsFilterBar from "../components/leads/LeadsFilterBar";
import LeadsStats from "../components/leads/LeadsStats";
import LeadsTable from "../components/leads/LeadsTable";
import LeadsGrid from "../components/leads/LeadsGrid";

const Leads = () => {
  const navigate = useNavigate();

  // ===================== STATE DATA & FILTER =====================
  const [leads, setLeads] = useState(mockLeads);

  const [search, setSearch] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const [view, setView] = useState("table");

  // ===================== UTIL =====================

  const formatStatusLabel = (status) => status || "-";

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

  const handleRowClick = (id) => {
    navigate(`/leads/${id}`);
  };

  const handleCallLead = (lead) => {
    console.log("Call lead:", lead.name);
  };

  const handleEmailLead = (lead) => {
    console.log("Email lead:", lead.name);
  };

  const handleAddNote = (lead) => {
    console.log("Add note for:", lead.name);
  };

  // ===================== FILTER + SORT =====================

  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // Filter skor
    if (scoreFilter !== "all") {
      result = result.filter(
        (lead) => getScoreCategory(lead.score) === scoreFilter
      );
    }

    // Filter usia
    if (ageFilter !== "all") {
      result = result.filter((lead) => {
        if (ageFilter === "young") return lead.age < 30;
        if (ageFilter === "middle") return lead.age >= 30 && lead.age <= 50;
        if (ageFilter === "senior") return lead.age > 50;
        return true;
      });
    }

    // Filter pekerjaan
    if (jobFilter !== "all") {
      result = result.filter((lead) => {
        const job = (lead.job || lead.title || "").toLowerCase();

        if (jobFilter === "management")
          return (
            job.includes("manager") ||
            job.includes("head") ||
            job.includes("director")
          );

        if (jobFilter === "entrepreneur") return job.includes("entrepreneur");

        if (jobFilter === "professional")
          return (
            job.includes("engineer") ||
            job.includes("developer") ||
            job.includes("it") ||
            job.includes("consultant")
          );

        if (jobFilter === "others")
          return !(
            job.includes("manager") ||
            job.includes("head") ||
            job.includes("director") ||
            job.includes("entrepreneur") ||
            job.includes("engineer") ||
            job.includes("developer") ||
            job.includes("it") ||
            job.includes("consultant")
          );

        return true;
      });
    }

    // Filter status
    if (statusFilter !== "all") {
      result = result.filter(
        (lead) =>
          (lead.status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Pencarian
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((lead) => {
        const name = (lead.name || "").toLowerCase();
        const email = (lead.email || "").toLowerCase();
        const job = (lead.job || lead.title || "").toLowerCase();
        const phone = (lead.phone || "").toLowerCase();
        return (
          name.includes(q) ||
          email.includes(q) ||
          job.includes(q) ||
          phone.includes(q)
        );
      });
    }

    // Sorting
    if (sortField) {
      result.sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (sortField === "job") {
          valA = (a.job || a.title || "").toLowerCase();
          valB = (b.job || b.title || "").toLowerCase();
        }

        if (typeof valA === "string") {
          const cmp = valA.localeCompare(valB);
          return sortDir === "asc" ? cmp : -cmp;
        }

        if (typeof valA === "number") {
          return sortDir === "asc" ? valA - valB : valB - valA;
        }

        return 0;
      });
    }

    return result;
  }, [
    leads,
    scoreFilter,
    ageFilter,
    jobFilter,
    statusFilter,
    search,
    sortField,
    sortDir,
  ]);

  // ===================== STATS SUMMARY =====================

  const { totalLeads, highPriorityLeads, avgScore, followUpToday } =
    useMemo(() => {
      const total = filteredLeads.length;
      const high = filteredLeads.filter((lead) => lead.score >= 85).length;
      const avg =
        total === 0
          ? 0
          : Math.round(
              filteredLeads.reduce((sum, l) => sum + (l.score || 0), 0) / total
            );
      const followUp = filteredLeads.filter(
        (lead) => (lead.status || "").toLowerCase() === "follow up"
      ).length;

      return {
        totalLeads: total,
        highPriorityLeads: high,
        avgScore: avg,
        followUpToday: followUp,
      };
    }, [filteredLeads]);

  // ===================== RENDER =====================

  return (
    <>
      {/* HEADER ATAS */}
      <LeadsHeader search={search} onSearchChange={setSearch} />

      {/* KONTEN LEADS */}
      <div className="leads-content">
        {/* CARD FILTER */}
        <LeadsFilterBar
          scoreFilter={scoreFilter}
          setScoreFilter={setScoreFilter}
          ageFilter={ageFilter}
          setAgeFilter={setAgeFilter}
          jobFilter={jobFilter}
          setJobFilter={setJobFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          view={view}
          setView={setView}
          onRefresh={() => {
            setLeads([...mockLeads]);
            console.log("Refresh data");
          }}
          onExport={() => console.log("Export lead")}
        />

        {/* CARD STATISTIK */}
        <LeadsStats
          totalLeads={totalLeads}
          highPriorityLeads={highPriorityLeads}
          avgScore={avgScore}
          followUpToday={followUpToday}
        />

        {/* TABLE / GRID */}
        {view === "table" ? (
          <LeadsTable
            leads={filteredLeads}
            onSort={handleSort}
            getScoreCategory={getScoreCategory}
            formatStatusLabel={formatStatusLabel}
            onRowClick={handleRowClick}
            onCallLead={handleCallLead}
            onEmailLead={handleEmailLead}
            onAddNote={handleAddNote}
          />
        ) : (
          <LeadsGrid
            leads={filteredLeads}
            getScoreCategory={getScoreCategory}
            formatStatusLabel={formatStatusLabel}
            onCardClick={handleRowClick}
            onCallLead={handleCallLead}
            onEmailLead={handleEmailLead}
            onAddNote={handleAddNote}
          />
        )}
      </div>
    </>
  );
};

export default Leads;
