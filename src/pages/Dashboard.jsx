import React from "react";

import {
  stats,
  conversionTrend,
  scoreDistribution,
  priorityLeads,
  activities,
} from "../data/dashboardMock";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import ConversionChart from "../components/dashboard/ConversionChart";
import ScoreDistributionChart from "../components/dashboard/ScoreDistributionChart";
import PriorityLeads from "../components/dashboard/PriorityLeads";
import ActivityList from "../components/dashboard/ActivityList";

const Dashboard = () => {
  return (
    <>
      <DashboardHeader />

      <div className="dashboard-content">
        <StatsGrid stats={stats} />

        <div className="charts-row">
          <ConversionChart conversionTrend={conversionTrend} />
          <ScoreDistributionChart scoreDistribution={scoreDistribution} />
        </div>

        <div className="bottom-section">
          <PriorityLeads priorityLeads={priorityLeads} />
          <ActivityList activities={activities} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
