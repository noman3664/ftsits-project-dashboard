import React, { useState, useEffect, useMemo } from "react";
import styles from "./SummaryTable.module.css";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

const TotalTask = ({ title, bgColor }) => {
  const sampleTasks = [
    { id: 1, title: "Frontend Fix", assignedTo: "Admin" },
    { id: 2, title: "API Setup", assignedTo: "User1" },
    { id: 3, title: "Bug Testing", assignedTo: "Admin" },
    { id: 4, title: "Design Update", assignedTo: "User2" },
    { id: 5, title: "Database Migration", assignedTo: "Admin" },
    { id: 6, title: "Deploy App", assignedTo: "User1" },
    { id: 7, title: "Code Review", assignedTo: "User3" },
  ];

  const [tasks] = useState(sampleTasks);
  const [filteredTasks, setFilteredTasks] = useState(sampleTasks);
  const [summary, setSummary] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEntries] = useState(4);

  useEffect(() => {
    const summaryMap = {};

    filteredTasks.forEach((task) => {
      const user = task.assignedTo;
      if (!summaryMap[user]) summaryMap[user] = 0;
      summaryMap[user]++;
    });

    const summaryArr = Object.entries(summaryMap).map(([user, total]) => ({
      user,
      total,
    }));

    setSummary(summaryArr);
    setCurrentPage(1); // Reset pagination on search/filter change
  }, [filteredTasks]);

  const totalPages = Math.ceil(summary.length / showEntries);
  const startIndex = (currentPage - 1) * showEntries;

  const displayedSummary = useMemo(
    () => summary.slice(startIndex, startIndex + showEntries),
    [summary, startIndex, showEntries]
  );

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.header} ${bgColor}`}>
        <h2 className={styles.title}>{title}</h2>

        <SearchBar
          data={tasks}
          setFilteredData={setFilteredTasks}
          searchKeys={["title", "assignedTo"]}
        />
      </div>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Number of Tasks</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {displayedSummary.length > 0 ? (
            displayedSummary.map((item, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? styles.rowEven : styles.rowOdd}
              >
                <td className={styles.td}>{item.user}</td>
                <td className={styles.td}>{item.total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className={styles.noData}>
                No results found
              </td>
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

export default TotalTask;
