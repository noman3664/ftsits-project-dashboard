import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

export default function SearchBar({ data, setFilteredData, searchKeys }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!data || data.length === 0) return;
    if (!query.trim()) {
      setFilteredData(data);
      return;
    }

    const lowerQuery = query.toLowerCase();

    const filtered = data.filter((item) =>
      searchKeys.some((key) =>
        String(item[key]).toLowerCase().includes(lowerQuery)
      )
    );

    setFilteredData(filtered);
  }, [query, data, searchKeys, setFilteredData]);

  return (
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
  );
}
