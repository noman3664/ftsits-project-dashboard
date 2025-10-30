import React, { useState, useMemo } from "react";
import { Edit, Plus, Trash } from "lucide-react";
import CreateTaskForm from "./CreateTaskForm";
import EditTaskForm from "./EditTaskForm";
import ViewTaskPage from "./ViewTaskPage";
import SearchBar from "../Dashboard/SearchBar";
import Pagination from "../Dashboard/Pagination";
import ReusableTable from "../Dashboard/Table";
import styles from "./Tasks.module.css";

export default function Tasks() {
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

  const [filteredData, setFilteredData] = useState(tasks);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);

  const showEntries = 10;

  // Keep filtered data updated when tasks change
  useMemo(() => {
    setFilteredData(tasks);
  }, [tasks]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const displayedTasks = filteredData.slice(startIndex, startIndex + showEntries);

  // Handlers
  const handleSaveTask = (taskData) => {
    const newTask = {
      id: tasks.length + 1,
      title: taskData.title,
      project: taskData.project || "Unassigned",
      assignedTo: taskData.assignTo || "Unassigned",
      status: "Open",
      priority: taskData.priority || "Medium",
    };
    setTasks([...tasks, newTask]);
    setShowCreateForm(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Columns for the reusable table
  const columns = [
    { key: "title", label: "Title" },
    { key: "project", label: "Project" },
    { key: "assignedTo", label: "Assigned To" },
    {
      key: "status",
      label: "Status",
      render: (task) => (
        <span
          className={
            task.status === "Open"
              ? styles.statusOpen
              : task.status === "In Progress"
              ? styles.statusProgress
              : styles.statusClosed
          }
        >
          {task.status}
        </span>
      ),
    },
    {
      key: "priority",
      label: "Priority",
      render: (task) => (
        <span
          className={
            task.priority === "High"
              ? styles.priorityHigh
              : task.priority === "Medium"
              ? styles.priorityMedium
              : styles.priorityLow
          }
        >
          {task.priority}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (task) => (
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
      ),
    },
  ];

  return (
    <div className={styles.container}>
      {/* Modals for Create / Edit / View */}
      {showCreateForm && (
        <CreateTaskForm
          onClose={() => setShowCreateForm(false)}
          onSave={handleSaveTask}
        />
      )}

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

      {viewingTask && (
        <ViewTaskPage task={viewingTask} onClose={() => setViewingTask(null)} />
      )}

      {/* Main Task Table */}
      {!showCreateForm && !editingTask && !viewingTask && (
        <>
          <div className={styles.header}>
            <button
              className={styles.createButton}
              onClick={() => setShowCreateForm(true)}
            >
              <Plus size={16} /> New Task
            </button>
          </div>

          <div className={styles.controlsBar}>
            <div className={styles.showEntries}>
              <span className={styles.showButton}>Show Entries</span>
              <span className={styles.entriesCount}>{filteredData.length}</span>
            </div>

            {/* ✅ SearchBar directly filters tasks and updates filteredData */}
            <SearchBar
              data={tasks}
              setFilteredData={setFilteredData}
              searchKeys={["title", "project", "assignedTo", "status", "priority"]}
            />
          </div>

          <ReusableTable
            data={displayedTasks}
            columns={columns}
            startIndex={startIndex}
            emptyMessage="No tasks found."
            showIndex={true}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            totalItems={filteredData.length}
            displayedItems={showEntries}
          />
        </>
      )}
    </div>
  );
}
