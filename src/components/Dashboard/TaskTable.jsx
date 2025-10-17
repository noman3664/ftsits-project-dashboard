import React, { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import styles from "./TaskTable.module.css";

const TaskTable = ({ title, bgColor }) => {
  const tasks = [
    { id: 1, title: "Frontend Task", status: "Open", date: "2025/09/25", project: "Frontend", assignedTo: "User1" },
    { id: 2, title: "Backend Task", status: "Closed", date: "2025/10/02", project: "Backend", assignedTo: "User2" },
    { id: 3, title: "UI Design", status: "In Progress", date: "2025/09/28", project: "Design", assignedTo: "User3" },
    { id: 4, title: "Testing", status: "Open", date: "2025/09/30", project: "QA", assignedTo: "User4" },
  ];

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEntries] = useState(5);

  const totalPages = Math.ceil(filteredTasks.length / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const displayedTasks = useMemo(
    () => filteredTasks.slice(startIndex, startIndex + showEntries),
    [filteredTasks, startIndex, showEntries]
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={`${styles.header} ${bgColor}`}>
        <h2 className={styles.title}>{title}</h2>
        <SearchBar
          data={tasks}
          setFilteredData={setFilteredTasks}
          searchKeys={["title", "status", "project", "assignedTo", "date"]}
        />
      </div>

      {/* Table */}
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th>Date</th>
            <th>Project</th>
            <th>Assigned To</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedTasks.length > 0 ? (
            displayedTasks.map((task, index) => (
              <tr key={task.id} className={styles.row}>
                <td>{startIndex + index + 1}</td>
                <td>{task.title}</td>
                <td
                  className={`${styles.td} ${
                    task.status === "Open"
                      ? styles.statusOpen
                      : task.status === "Closed"
                      ? styles.statusClosed
                      : styles.statusProgress
                  }`}
                >
                  {task.status}
                </td>
                <td>{task.date}</td>
                <td>{task.project}</td>
                <td>{task.assignedTo}</td>
                <td>
                  <button className={styles.viewBtn}>View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className={styles.noData}>
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Footer */}
      <div className={styles.footer}>
        <p>
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + showEntries, filteredTasks.length)} of{" "}
          {filteredTasks.length} entries
        </p>
        <div className={styles.pagination}>
          <button onClick={handlePrev} className={styles.pageBtnRed} disabled={currentPage === 1}>
            Previous
          </button>
          <button className={styles.pageBtnYellow}>{currentPage}</button>
          <button
            onClick={handleNext}
            className={styles.pageBtnRed}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
