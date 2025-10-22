import React, { useState, useMemo } from "react";
import { Edit, Plus, Search, Trash } from "lucide-react";
import CreateTaskForm from "./CreateTaskForm";
import EditTaskForm from "./EditTaskForm";
import ViewTaskPage from "./ViewTaskPage";
import styles from "./Tasks.module.css";

export default function Tasks() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);

  const showEntries = 10;

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Frontend Task 1",
      project: "Frontend Task",
      assignedTo: "User 1",
      status: "Open",
      priority: "Medium",
    },
    {
      id: 2,
      title: "Backend API Setup",
      project: "Backend Task",
      assignedTo: "User 2",
      status: "In Progress",
      priority: "High",
    },
  ]);

  // 🔍 Filtered Tasks
  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) =>
        Object.values(task)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [searchQuery, tasks]
  );

  //  Pagination Logic
  const totalPages = Math.ceil(filteredTasks.length / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const displayedTasks = filteredTasks.slice(startIndex, startIndex + showEntries);

  // Handlers
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleSaveTask = (taskData) => {
    const newTask = {
      id: tasks.length + 1,
      title: taskData.title,
      status: "Open",
      date: taskData.date,
      project: taskData.assignTo || "Unassigned",
      assignedTo: taskData.assignTo || "Unassigned",
    };
    setTasks([...tasks, newTask]);
    setShowCreateForm(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className={styles.container}>
      {/* Show Create Form */}
      {showCreateForm && (
        <CreateTaskForm
          onClose={() => setShowCreateForm(false)}
          onSave={handleSaveTask}
        />
      )}

      {/* Show Edit Form */}
      {editingTask && (
        <EditTaskForm
          taskData={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(updatedTask) => {
            setTasks((prev) =>
              prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
            );
            setEditingTask(null);
          }}
        />

      )}

      {/* Show View Task Page */}
      {viewingTask && (
        <ViewTaskPage
          task={viewingTask}
          onClose={() => setViewingTask(null)}
        />
      )}

      {/* 👇 Main Task Table — only show when NOT creating/editing/viewing */}
      {!showCreateForm && !editingTask && !viewingTask && (
        <>
          {/* Header with "New Task" Button */}
          <div className={styles.header}>
            <button
              className={styles.createButton}
              onClick={() => setShowCreateForm(true)}
            >
              <Plus size={16} />
              New Task
            </button>
          </div>

          {/* Controls Bar */}
          <div className={styles.controlsBar}>
            <div className={styles.showEntries}>
              <span className={styles.showButton}>Show Entries:</span>
              <span className={styles.entriesCount}>{filteredTasks.length}</span>
            </div>

            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search anything here..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className={styles.searchInput}
              />
              <Search size={18} className={styles.searchIcon} />
            </div>
          </div>

          {/* Table */}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Title</th>
                  <th className={styles.th}>Project</th>
                  <th className={styles.th}>Assigned To</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Priority</th>
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedTasks.length > 0 ? (
                  displayedTasks.map((task) => (
                    <tr key={task.id} className={styles.tr}>
                      <td className={`${styles.td} ${styles.tdTitle}`}>
                        {task.title}
                      </td>
                      <td className={styles.td}>{task.project}</td>
                      <td className={styles.td}>{task.assignedTo}</td>
                      <td className={styles.td}>
                        <span className={styles.statusOpen}>{task.status}</span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.priorityMedium}>
                          {task.priority}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.actionButtons}>
                          <button
                            className={styles.viewButton}
                            onClick={() => setViewingTask(task)}
                          >
                            View
                          </button>
                          <button
                            className={styles.editButton}
                            onClick={() => setEditingTask(task)}
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            className={styles.deleteButton}
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className={styles.noData}>
                      No tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <span className={styles.footerText}>
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + showEntries, filteredTasks.length)} Entries
            </span>

            <div className={styles.pagination}>
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={
                  currentPage === 1
                    ? styles.pageButtonDisabled
                    : styles.prevButton
                }
              >
                Previous
              </button>

              <span className={styles.activePage}>{currentPage}</span>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={
                  currentPage === totalPages
                    ? styles.pageButtonDisabled
                    : styles.nextButton
                }
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

}
