import React, { useState, useMemo, useEffect } from "react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import ReusableTable from "./Table";
import styles from "./TaskTable.module.css";

const TaskTable = ({ title, bgColor }) => {
  const tasks = [
    { id: 1, title: "Frontend Task", status: "Open", date: "2025/09/25", project: "Frontend", assignedTo: "User1" },
    { id: 2, title: "Backend Task", status: "Closed", date: "2025/10/02", project: "Backend", assignedTo: "User2" },
    { id: 3, title: "UI Design", status: "In Progress", date: "2025/09/28", project: "Design", assignedTo: "User3" },
    { id: 4, title: "Testing", status: "Open", date: "2025/09/30", project: "QA", assignedTo: "User4" },
    { id: 5, title: "Bug Fix", status: "Closed", date: "2025/10/01", project: "Backend", assignedTo: "User2" },
    { id: 6, title: "Feature Development", status: "Open", date: "2025/10/05", project: "Frontend", assignedTo: "User5" },
    { id: 7, title: "Code Review", status: "In Progress", date: "2025/10/03", project: "QA", assignedTo: "User5" },
  ];

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [currentPage, setCurrentPage] = useState(1);
  const showEntries = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredTasks]);

  const totalPages = Math.ceil(filteredTasks.length / showEntries);

  const displayedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * showEntries;
    return filteredTasks.slice(startIndex, startIndex + showEntries);
  }, [filteredTasks, currentPage, showEntries]);

  const columns = [
    { key: "title", label: "Title", headerClassName: styles.th },
    {
      key: "status",
      label: "Status",
      headerClassName: styles.th,
      className: (item) => {
        const baseClass = styles.td;
        if (item.status === "Open") return `${baseClass} ${styles.statusOpen}`;
        if (item.status === "Closed") return `${baseClass} ${styles.statusClosed}`;
        return `${baseClass} ${styles.statusProgress}`;
      },
    },
    { key: "date", label: "Date", headerClassName: styles.th },
    { key: "project", label: "Project", headerClassName: styles.th },
    { key: "assignedTo", label: "Assigned To", headerClassName: styles.th },
  ];

  const handleViewTask = (task) => {
    console.log("Viewing task:", task);
  };

  return (
    <div className={styles.wrapper}>
      {/* Header and Search */}
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
          searchKeys={["title", "status", "project", "assignedTo", "date"]}
        />
      </div>



      {/* Reusable Table */}
      <ReusableTable
        data={displayedTasks}
        columns={columns}
        onAction={handleViewTask}
        actionLabel="View"
        emptyMessage="No tasks found"
      />

      {/* Pagination */}
      {filteredTasks.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          totalItems={filteredTasks.length}
          displayedItems={displayedTasks.length}
        />
      )}
    </div>
  );
};

export default TaskTable;
