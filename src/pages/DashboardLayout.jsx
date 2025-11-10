import React, { useState } from "react";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import "./Dashboard.css"
import { Outlet } from "react-router-dom";


export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    window.pathname.reload()
  };

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

        <main className="dashboard-content" >
          <Outlet />
        </main>
      </div>
    </div>
  );
}