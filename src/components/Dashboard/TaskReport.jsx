import React, { useState, useMemo } from "react";
import { ClipboardList } from "lucide-react";
import SearchBar from "../Dashboard/SearchBar";
import Pagination from "../Dashboard/Pagination";
import styles from "./TaskReport.module.css";
import ReusableTable from "../Dashboard/Table";

export default function TaskReport() {
  const [filters, setFilters] = useState({
    user: "",
    project: "",
    status: "",
    priority: "",
    from: "",
    to: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const tasks = useMemo(
    () => [
      {
        id: 1,
        task: "Frontend Task 1",
        assignee: "User1",
        status: "Open",
        priority: "Medium",
        created: "2025-10-20",
      },
      {
        id: 2,
        task: "Backend Task 2",
        assignee: "User2",
        status: "In Progress",
        priority: "High",
        created: "2025-10-21",
      },
      {
        id: 3,
        task: "UI Update",
        assignee: "User1",
        status: "Closed",
        priority: "Low",
        created: "2025-10-22",
      },
    ],
    []
  );

  /* -------------------- Filtering Logic -------------------- */
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        !searchQuery ||
        Object.values(task)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesUser = !filters.user || task.assignee.toLowerCase() === filters.user;
      const matchesProject = !filters.project || task.task.toLowerCase().includes(filters.project);
      const matchesStatus = !filters.status || task.status.toLowerCase() === filters.status;
      const matchesPriority = !filters.priority || task.priority.toLowerCase() === filters.priority;
      return matchesSearch && matchesUser && matchesProject && matchesStatus && matchesPriority;
    });
  }, [tasks, filters, searchQuery]);

  /* -------------------- Pagination -------------------- */
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedTasks = filteredTasks.slice(startIndex, startIndex + itemsPerPage);

  /* -------------------- Columns Setup -------------------- */
  const columns = [
    { key: "task", label: "Task" },
    { key: "assignee", label: "Assignee" },
    {
      key: "status",
      label: "Status",
      render: (task) => (
        <span
          className={
            task.status === "Open"
              ? styles.statusOpen
              : task.status === "Closed"
              ? styles.statusClosed
              : styles.statusProgress
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
    { key: "created", label: "Created" },
  ];

  /* -------------------- Handlers -------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => console.log("Filters applied:", filters);
  const handleExport = () => console.log("Exporting CSV...");

  return (
    <div className={styles.taskReport}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.headerBtn}>
          <ClipboardList size={16} />
          Task Report
        </button>
      </div>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.grid4}>
          <FilterSelect
            label="User"
            name="user"
            value={filters.user}
            onChange={handleChange}
            options={["User1", "User2"]}
          />
          <FilterSelect
            label="Project"
            name="project"
            value={filters.project}
            onChange={handleChange}
            options={["Frontend", "Backend"]}
          />
          <FilterSelect
            label="Status"
            name="status"
            value={filters.status}
            onChange={handleChange}
            options={["Open", "In Progress", "Closed"]}
          />
          <FilterSelect
            label="Priority"
            name="priority"
            value={filters.priority}
            onChange={handleChange}
            options={["Low", "Medium", "High"]}
          />
          <FilterInput name="from" type="date" value={filters.from} onChange={handleChange} />
          <FilterInput name="to" type="date" value={filters.to} onChange={handleChange} />
        </div>

        <div className={styles.btnRow}>
          <button onClick={handleFilter} className={styles.btnPrimary}>
            Filter
          </button>
          <button onClick={handleExport} className={styles.btnSecondary}>
            Export CSV
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className={styles.tableWrapper}>
        <div className={styles.controlsBar}>
          <span className={styles.showLabel}>All Tasks</span>

          {/* 🔍 Reusable Search */}
          <div className={styles.searchContainer}>
            <SearchBar
              data={tasks}
              searchKeys={["task", "assignee", "status", "priority"]}
              setFilteredData={() => {}}
              placeholder="Search anything here..."
              onSearch={(query) => setSearchQuery(query)}
            />
          </div>
        </div>

        <ReusableTable
          data={displayedTasks}
          columns={columns}
          startIndex={startIndex}
          emptyMessage="No tasks found."
          showIndex={false}
        />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            totalItems={filteredTasks.length}
            displayedItems={itemsPerPage}
          />
      </div>
    </div>
  );
}

function FilterSelect({ label, name, value, onChange, options }) {
  return (
    <div>
      <select name={name} value={value} onChange={onChange} className={styles.input}>
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt.toLowerCase()}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function FilterInput({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <input type={type} name={name} value={value} onChange={onChange} className={styles.input} />
    </div>
  );
}
