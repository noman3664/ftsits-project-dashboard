import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";

export default function SearchBar({ data, setFilteredData, searchKeys = [] }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // 🔍 Predefined project pages for global search
  const pages = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Roles", path: "/roles" },
    { name: "Permissions", path: "/permissions" },
    { name: "Tasks", path: "/tasks" },
    { name: "Projects", path: "/projects" },
    { name: "Task Report", path: "/task-report" },
    { name: "Edit Profile", path: "/edit-profile" },
  ];

  //  Table/Local Data Filtering
  useEffect(() => {
    if (!data || !setFilteredData) return;
    if (!query.trim()) {
      setFilteredData(data);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = data.filter((item) =>
      searchKeys.some((key) =>
        String(item[key] || "").toLowerCase().includes(lowerQuery)
      )
    );

    setFilteredData(filtered);
  }, [query, data, searchKeys, setFilteredData]);

  //  Global page search results
  const filteredPages =
    !data && query
      ? pages.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
      : [];

  const handleNavigate = (path) => {
    navigate(path);
    setQuery("");
  };

  return (
    <div className={styles.searchBoxWrapper}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search anything here..."
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FaSearch className={styles.searchIcon} />
      </div>

      {/* Dropdown only for global search */}
      {filteredPages.length > 0 && (
        <ul className={styles.searchDropdown}>
          {filteredPages.map((page) => (
            <li
              key={page.path}
              className={styles.searchItem}
              onClick={() => handleNavigate(page.path)}
            >
              {page.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
