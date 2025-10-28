import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout";
import Login from "./pages/Login";
import Roles from "./components/Dashboard/Roles";
import Permissions from "./components/Dashboard/Permissions";
import Tasks from "./components/Dashboard/Tasks";
import Projects from "./components/Dashboard/Projects";
import TaskReport from "./components/Dashboard/TaskReport";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

export default function App() {
  console.log("App component rendered"); // Debug log

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="roles" element={<Roles />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="projects" element={<Projects />} />
          <Route path="task-report" element={<TaskReport />} />
          <Route path="users" element={<div>Users Component</div>} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}