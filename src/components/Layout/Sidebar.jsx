import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./Sidebar.module.css";
import {
  LayoutDashboard,
  Shield,
  LockKeyhole,
  ClipboardList,
  FolderKanban,
  FileBarChart,
  Users,
} from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const links = [
  { name: "Dashboard", path: ".", icon: <LayoutDashboard size={18} />, end: true },
  { name: "Roles", path: "roles", icon: <Shield size={18} /> },
  { name: "Permissions", path: "permissions", icon: <LockKeyhole size={18} /> },
  { name: "Tasks", path: "tasks", icon: <ClipboardList size={18} /> },
  { name: "Projects", path: "projects", icon: <FolderKanban size={18} /> },
  { name: "Task Report", path: "task-report", icon: <FileBarChart size={18} /> },
  { name: "Users", path: "users", icon: <Users size={18} /> },
];


  return (
    <div
      className={`${styles.sidebar} ${
        isOpen ? styles.sidebarOpen : styles.sidebarClosed
      }`}
    >
      <button onClick={toggleSidebar} className={styles.closeBtn}>
        ✕
      </button>

      <div className={styles.sidebarHeader}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        {links.map(({ name, path, icon, end }) => (
          <NavLink
            key={name}
            to={path}
            end={end}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.linkActive : ""}`
            }
            onClick={toggleSidebar} 
          >
            {icon}
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
