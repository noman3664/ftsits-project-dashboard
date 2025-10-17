import React, { useState, useMemo } from "react";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import styles from "./Projects.module.css";

function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const showEntries = 12;
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Frontend Task 1",
      description: "All Frontend Task Here",
    },
  ]);

  // Filtered projects by search
  const filteredProjects = useMemo(() => {
    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, projects]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const displayedProjects = filteredProjects.slice(startIndex, startIndex + showEntries);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  return (
    <div className={styles.projectsContainer}>
      {/* Header Section */}
      <div className={styles.header}>
        <button className={styles.createButton}>
          <Plus size={16} />
          New Project
        </button>
      </div>

      {/* Content Section */}
      <div className={styles.content}>
        {/* Controls Bar */}
        <div className={styles.controlsBar}>
          <div className={styles.showEntries}>
            <span className={styles.showLabel}>Show Entries</span>
            <span className={styles.entriesValue}>12</span>
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
            <Search className={styles.searchIcon} size={18} />
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Description</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {displayedProjects.length > 0 ? (
                displayedProjects.map((project) => (
                  <tr key={project.id} className={styles.tableRow}>
                    <td className={styles.td}>
                      <span className={styles.projectName}>{project.name}</span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.projectDescription}>{project.description}</span>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.actionButtons}>
                        <button className={styles.editButton}>
                          <Edit size={14} />
                        </button>
                        <button 
                          className={styles.deleteButton}
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className={styles.noData}>
                    No matching projects found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.footerText}>
            Showing {startIndex + 1} to {Math.min(startIndex + showEntries, filteredProjects.length)} Entries
          </span>
          <div className={styles.pagination}>
            <button
              className={styles.paginationButton}
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button className={`${styles.paginationButton} ${styles.paginationActive}`}>
              {currentPage}
            </button>
            <button
              className={styles.paginationButton}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;