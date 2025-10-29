import React, { useState, useEffect } from "react";
import styles from "./SummaryTable.module.css";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

const SummaryTable = ({ title, bgColor }) => {
  const sampleTasks = [
    { id: 1, title: "Frontend Task", status: "Open", date: "2025/09/25", project: "Frontend", assignedTo: "User1" },
    { id: 2, title: "Backend Task", status: "Closed", date: "2025/10/02", project: "Backend", assignedTo: "User2" },
    { id: 3, title: "UI Design", status: "In Progress", date: "2025/09/28", project: "Design", assignedTo: "User3" },
    { id: 4, title: "Testing", status: "Open", date: "2025/09/30", project: "QA", assignedTo: "User4" },
    { id: 5, title: "Bug Fix", status: "Closed", date: "2025/10/01", project: "Backend", assignedTo: "User2" },
    { id: 6, title: "Feature Development", status: "Open", date: "2025/10/05", project: "Frontend", assignedTo: "User5" },
    { id: 7, title: "Code Review", status: "In Progress", date: "2025/10/03", project: "QA", assignedTo: "User5" },
  ];

  const [tasks] = useState(sampleTasks);
  const [filteredTasks, setFilteredTasks] = useState(sampleTasks);
  const [summary, setSummary] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [showEntries] = useState(4);

  const totalPages = Math.ceil(summary.length / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const displayedSummary = summary.slice(startIndex, startIndex + showEntries);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    const userSummary = {};

    filteredTasks.forEach((task) => {
      const user = task.assignedTo;
      if (!userSummary[user]) {
        userSummary[user] = { total: 0, open: 0, closed: 0 };
      }
      userSummary[user].total++;
      if (task.status.toLowerCase() === "open") userSummary[user].open++;
      if (task.status.toLowerCase() === "closed") userSummary[user].closed++;
    });

    // Convert object → array for table rendering
    setSummary(Object.entries(userSummary).map(([user, stats]) => ({ user, ...stats })));
    setCurrentPage(1); // Reset pagination on search/filter change
  }, [filteredTasks]);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.header} ${bgColor}`}>
        <h2 className={styles.title}>{title}</h2>

        <SearchBar
          data={tasks}
          setFilteredData={setFilteredTasks}
          searchKeys={["title", "status", "project", "assignedTo", "date"]}
        />
      </div>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>User</th>
            <th className={styles.th}>Total</th>
            <th className={styles.th}>Open</th>
            <th className={styles.th}>Closed</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {displayedSummary.length > 0 ? (
            displayedSummary.map((row, i) => (
              <tr key={row.user} className={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                <td className={styles.td}>{row.user}</td>
                <td className={styles.td}>{row.total}</td>
                <td className={styles.td}>{row.open}</td>
                <td className={styles.td}>{row.closed}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={styles.noData}>No results found</td>
            </tr>
          )}
        </tbody>

      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        totalItems={summary.length}
        displayedItems={displayedSummary.length}
      />
    </div>
  );
};

export default SummaryTable;
