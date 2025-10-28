import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import "./Dashboard.css";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    window.pathname.reload()
  };
  const location = useLocation();

  return (
    <div className="dashboard-wrapper">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {isSidebarOpen && (
        <div
          className="overlay"
          onClick={toggleSidebar}
        />
      )}

      <div className="dashboard-main">
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="dashboard-content" key={location.pathname}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}