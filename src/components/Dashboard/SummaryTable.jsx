import React, { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import ReusableTable from "./Table";
import styles from "./SummaryTable.module.css";


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

  const [filteredTasks, setFilteredTasks] = useState(sampleTasks);
  const [currentPage, setCurrentPage] = useState(1);
  const showEntries = 4;

  const taskSummary = useMemo(() => {
    const summaryMap = {};
    filteredTasks.forEach((task) => {
      const user = task.assignedTo;
      if (!summaryMap[user]) {
        summaryMap[user] = { total: 0, open: 0, closed: 0 };
      }
      summaryMap[user].total++;
      if (task.status.toLowerCase() === "open") summaryMap[user].open++;
      if (task.status.toLowerCase() === "closed") summaryMap[user].closed++;
    });
    return Object.entries(summaryMap).map(([user, stats]) => ({ user, ...stats }));
  }, [filteredTasks]);

  const totalPages = Math.ceil(taskSummary.length / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const displayedSummary = taskSummary.slice(startIndex, startIndex + showEntries);

  const columns = [
    { key: "user", label: "User", headerClassName: styles.th },
    { key: "total", label: "Total", headerClassName: styles.th },
    { key: "open", label: "Open", headerClassName: styles.th },
    { key: "closed", label: "Closed", headerClassName: styles.th },
  ];

  const getRowClassName = (_, index) =>
    index % 2 === 0 ? styles.rowEven : styles.rowOdd;

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
                data={sampleTasks}
                setFilteredData={setFilteredTasks}
                searchKeys={["user","total","open","closed"]}
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
        totalItems={taskSummary.length}
        displayedItems={displayedSummary.length}
      />
    </div>
  );
};

export default SummaryTable;
