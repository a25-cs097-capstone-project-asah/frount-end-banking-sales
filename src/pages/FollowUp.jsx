import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { toggleTheme } from "../theme";

import { getLeads } from "../api/leads";
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

  // FILTER STATE
  const [search, setSearch] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");

  // ======================================================
  // FETCH FOLLOW-UP LEADS + PATCH PHONE
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

  useEffect(() => {
    fetchFollowUps();
  }, []);

  // ======================================================
  // FILTERING
  // ======================================================
  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // SCORE
    result = result.filter((lead) => {
      const s = Number(lead.probabilityScore) || 0;
      if (scoreFilter === "high") return s >= 85;
      if (scoreFilter === "medium") return s >= 70 && s < 85;
      if (scoreFilter === "low") return s < 70;
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

  // ======================================================
  // STATS
  // ======================================================
  const totalLeads = filteredLeads.length;

  const highPriorityLeads = filteredLeads.filter(
    (l) => Number(l.probabilityScore) >= 85
  ).length;

  const avgScore = filteredLeads.length
    ? Math.round(
        filteredLeads.reduce(
          (acc, l) => acc + Number(l.probabilityScore || 0),
          0
        ) / filteredLeads.length
      )
    : 0;

  const followUpToday = totalLeads;

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
          hideStatusFilter // ⛔ no status filter
          hideViewSwitcher // ⛔ force table view
          onRefresh={fetchFollowUps}
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
            formatStatusLabel={(s) => s}
            onRowClick={(l) => navigate(`/leads/${l.id}`)}
          />
        )}
      </div>
    </>
  );
};

export default FollowUp;
