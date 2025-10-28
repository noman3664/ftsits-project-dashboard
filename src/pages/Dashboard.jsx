// pages/Dashboard.jsx
import React from "react";
import StatsCards from "../components/Dashboard/StatsCards";
import SummaryTable from "../components/Dashboard/SummaryTable";
import TaskTable from "../components/Dashboard/TaskTable";
import PieChart from "../components/Dashboard/PieChart";
import TotalTask from "../components/Dashboard/TotalTask";

export default function DashboardHome() {
  console.log("DashboardHome component rendered"); // Debug log
  
  return (
    <div className="dashboard-section">
      <StatsCards />
      <div className="summary-grid">
        <TotalTask title="Number of Tasks" bgColor="bg-[#FFD2CE]" />
        <PieChart
          data={[
            { name: "Open Task", value: 30 },
            { name: "In Progress", value: 40 },
            { name: "Over Due", value: 20 },
            { name: "Closed Task", value: 10 },
          ]}
        />
      </div>
      <div className="task-tables">
        <TaskTable title="Recent Tasks" bgColor="bg-[#FFD2CE]" />
        <TaskTable title="Over Tasks" bgColor="bg-[#FFD2CE]" />
      </div>
      <div className="summary-grid">
        <SummaryTable title="Engineer Tasks" bgColor="bg-[#FFD2CE]" />
        <SummaryTable title="Project Wise Tasks" bgColor="bg-[#FFD2CE]" />
      </div>
    </div>
  );
}