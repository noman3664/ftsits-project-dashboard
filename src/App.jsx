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
import FireSafetyForm from "./components/Dashboard/FireSafetyForm";
import ProtectedRoute from "./components/Dashboard/ProtectedRoutes";
import EditProfile from "./pages/EditProfile";
export default function App() {
  console.log("App component rendered");

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="roles" element={<Roles />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="projects" element={<Projects />} />
          <Route path="task-report" element={<TaskReport />} />
          <Route path="users" element={<div>Users Component</div>} />
          <Route path="edit-profile" element={<EditProfile />} />
        </Route>

        {/* Standalone Protected Route */}
        <Route
          path="/safety"
          element={
            <ProtectedRoute>
              <FireSafetyForm />
            </ProtectedRoute>
          }
        />

        {/* 404 - Must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}