import React, { useState, useEffect, useMemo } from "react";
import ReusableTable from "./Table";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import styles from "./SummaryTable.module.css";

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
    setCurrentPage(1);
  }, [filteredTasks]);

  const totalPages = Math.ceil(summary.length / showEntries);
  const startIndex = (currentPage - 1) * showEntries;

  const displayedSummary = useMemo(
    () => summary.slice(startIndex, startIndex + showEntries),
    [summary, startIndex, showEntries]
  );

  const columns = [
    { key: "user", label: "Name", headerClassName: styles.th },
    { key: "total", label: "Number of Tasks", headerClassName: styles.th }
  ];

  const getRowClassName = (_, index) => {
    return index % 2 === 0 ? styles.rowEven : styles.rowOdd;
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.header} ${bgColor}`}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      {/* Entries Info */}
      <div className={styles.controlsBar}>
        <div className={styles.showEntries}>
          <span className={styles.showButton}>Show Entries:</span>
          <span className={styles.entriesCount}>{filteredTasks.length}</span>
        </div>
        <SearchBar
          data={tasks}
          setFilteredData={setFilteredTasks}
          searchKeys={["title", "assignedTo"]}
        />
      </div>

      <ReusableTable
        data={displayedSummary}
        columns={columns}
        showIndex={false}
        rowClassName={getRowClassName}
        emptyMessage="No results found"
      />

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