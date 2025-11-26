import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { toggleTheme } from "../theme";
import { getPriorityLeads } from "../api/dashboard";
import { fetchPhoneForLeads } from "../utils/fetchPhone";

import LeadsHeader from "../components/leads/LeadsHeader";
import LeadsFilterBar from "../components/leads/LeadsFilterBar";
import LeadsStats from "../components/leads/LeadsStats";
import LeadsTable from "../components/leads/LeadsTable";

const PriorityLeads = () => {
  const navigate = useNavigate();

  const [isLight, setIsLight] = useState(() =>
    document.documentElement.classList.contains("light")
  );

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // FILTER UI STATE
  const [search, setSearch] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");

  const handleToggleTheme = () => {
    toggleTheme();
    setIsLight((prev) => !prev);
  };

  // ======================================================
  // FETCH PRIORITY LEADS (STATUS TIDAK DIUBAH)
  // ======================================================
  const fetchPriority = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const data = await getPriorityLeads(30);

      // ❗ STATUS TIDAK DI NORMALISASI, LANGSUNG PAKAI RAW
      const withPhone = await fetchPhoneForLeads(data);

      setLeads(withPhone);
    } catch (err) {
      console.error(err);
      setErrorMsg("Gagal mengambil data prioritas tinggi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriority();
  }, []);

  // ======================================================
  // FILTERING
  // ======================================================
  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // Score
    result = result.filter((lead) => {
      const score = Number(lead.probabilityScore) || 0;
      if (scoreFilter === "high") return score >= 85;
      if (scoreFilter === "medium") return score >= 70 && score < 85;
      if (scoreFilter === "low") return score < 70;
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

    // Search
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

  // OPTIONS
  const jobOptions = useMemo(() => {
    const set = new Set();
    leads.forEach((l) => l.job && set.add(l.job));
    return [...set].sort();
  }, [leads]);

  // ======================================================
  // STATS
  // ======================================================
  const totalLeads = filteredLeads.length;
  const highPriorityLeads = totalLeads;

  const avgScore = totalLeads
    ? Math.round(
        filteredLeads.reduce(
          (acc, l) => acc + Number(l.probabilityScore || 0),
          0
        ) / totalLeads
      )
    : 0;

  const followUpToday = filteredLeads.filter(
    (l) => l.status === "follow-up"
  ).length; // RAW status, bukan “Follow Up”

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
          onRefresh={fetchPriority}
        />

        <LeadsStats
          totalLeads={totalLeads}
          highPriorityLeads={highPriorityLeads}
          avgScore={avgScore}
          followUpToday={followUpToday}
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
            formatStatusLabel={(s) => s} // status apa adanya
            onRowClick={(lead) => navigate(`/leads/${lead.id}`)}
          />
        )}
      </div>
    </>
  );
};

export default PriorityLeads;
