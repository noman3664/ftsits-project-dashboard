import React, { useState } from "react";
import { ClipboardList, Search } from "lucide-react";
import styles from "./TaskReport.module.css"; 

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
    const [showEntries] = useState(10); // entries per page

    const tasks = [
        { id: 1, task: "Frontend Task 1", assignee: "User1", status: "Open", priority: "Medium", created: "20/10/25" },
        { id: 2, task: "Backend Task 2", assignee: "User2", status: "In Progress", priority: "High", created: "21/10/25" },
        { id: 3, task: "UI Update", assignee: "User1", status: "Closed", priority: "Low", created: "22/10/25" },
        // Add more tasks to test pagination
    ];

    // Search & filter logic
    const filteredTasks = tasks.filter((task) =>
        task.task.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredTasks.length / showEntries);
    const startIndex = (currentPage - 1) * showEntries;
    const paginatedTasks = filteredTasks.slice(startIndex, startIndex + showEntries);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilter = () => console.log("Filters applied:", filters);
    const handleExport = () => console.log("Exporting CSV...");

    return (
        <div className={styles.taskReport}>
            {/* Filter Section */}
            <div className={styles.filterSection}>
                <div className={styles.header}>
                    <button className={styles.headerBtn}>
                        <ClipboardList size={16} />
                        Task Report
                    </button>
                </div>

                {/* Filters */}
                <div className={styles.grid4}>
                    <FilterSelect label="User" name="user" value={filters.user} onChange={handleChange} options={["User1", "User2"]} />
                    <FilterSelect label="Project" name="project" value={filters.project} onChange={handleChange} options={["Frontend", "Backend"]} />
                    <FilterSelect label="Status" name="status" value={filters.status} onChange={handleChange} options={["Open", "In Progress", "Closed"]} />
                    <FilterSelect label="Priority" name="priority" value={filters.priority} onChange={handleChange} options={["Low", "Medium", "High"]} />
                    <FilterInput name="from" type="date" value={filters.from} onChange={handleChange} />
                    <FilterInput name="to" type="date" value={filters.to} onChange={handleChange} />
                </div>

                <div className={styles.btnRow}>
                    <button onClick={handleFilter} className={styles.btnPrimary}>Filter</button>
                    <button onClick={handleExport} className={styles.btnSecondary}>Export CSV</button>
                </div>
            </div>

            {/* Table Section */}
            <div className={styles.tableWrapper}>
                <div className={styles.controlsBar}>
                    <span className={styles.showLabel}>Frontend</span>

                    <div className={styles.searchBar}>
                        <input
                            type="text"
                            placeholder="Search anything here..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                        <Search size={18} className={styles.searchIcon} />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className={styles.table}>
                        <thead className={styles.tableHead}>
                            <tr>
                                {["Task", "Assignee", "Status", "Priority", "Created"].map((heading) => (
                                    <th key={heading} className={styles.tableTh}>{heading}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedTasks.length > 0 ? (
                                paginatedTasks.map((task) => (
                                    <tr key={task.id} className={styles.tableRow}>
                                        <td className={styles.tableTdTitle}>{task.task}</td>
                                        <td className={styles.tableTd}>{task.assignee}</td>
                                        <td className={styles.tableTd}>
                                            <span className={styles.statusOpen}>{task.status}</span>
                                        </td>
                                        <td className={styles.tableTd}>
                                            <span className={styles.priorityMedium}>{task.priority}</span>
                                        </td>
                                        <td className={styles.tableTd}>{task.created}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className={styles.noData}>No tasks found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination */}
                <div className={styles.footer}>
                    <span className={styles.footerText}>
                        Showing {filteredTasks.length === 0 ? 0 : startIndex + 1} to{" "}
                        {Math.min(startIndex + showEntries, filteredTasks.length)} of{" "}
                        {filteredTasks.length} entries
                    </span>

                    <div className={styles.pagination}>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={currentPage === 1 ? styles.pageButtonDisabled : styles.prevButton}
                        >
                            Previous
                        </button>

                        <span className={styles.activePage}>{currentPage}</span>

                        <button
                            onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                            disabled={currentPage === totalPages}
                            className={currentPage === totalPages ? styles.pageButtonDisabled : styles.nextButton}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ----------------- Subcomponents ----------------- */
function FilterSelect({ label, name, value, onChange, options }) {
    return (
        <div>
            <select name={name} value={value} onChange={onChange} className={styles.input}>
                <option value="">{label || "Select"}</option>
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
