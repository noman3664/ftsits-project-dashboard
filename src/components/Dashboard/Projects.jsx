import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import styles from "./Projects.module.css";
import CreateProjectForm from "./CreateProjectForm";
import SearchBar from "./SearchBar";
import EditProjectForm from "./EditProjectForm";
function Projects() {
  const initialProjectsData = [
    {
      id: 1,
      name: "Project Alpha",
      description: "Description for Project Alpha",
    },
    {
      id: 2,
      name: "Project Beta",
      description: "Description for Project Beta",
    },
    {
      id: 3,
      name: "Project Gamma",
      description: "Description for Project Gamma",
    }
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [projectsData, setProjectsData] = useState(initialProjectsData);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [editedProject, setEditedProject] = useState(null);
  const showEntries = 12;



  useEffect(() => {
    setFilteredProjects(projectsData);
  }, [projectsData]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const displayedProjects = filteredProjects.slice(
    startIndex,
    startIndex + showEntries
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage((p) => p + 1);

  const handleDeleteProject = (projectId) => {
    setProjectsData(projectsData.filter((project) => project.id !== projectId));
  };

  const handleSaveProject = (newProject) => {
    setProjectsData((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newProject.name,
        description: newProject.description,
      },
    ]);
    setIsCreating(false);
  };

  const handleEditProject = (project) => {
    setEditedProject(project);
    setIsCreating(false);
  };

  const handleUpdateProject = (updatedProject) => {
    const updated = projectsData.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
    setProjectsData(updated);
    setEditedProject(null);
  };
  const handleCancelEdit = () => {
    setEditedProject(null);
  };

if (editedProject) {
    return (
      <div className={styles.projectsContainer}>
        <EditProjectForm 
          projectData={editedProject}
          onSave={handleUpdateProject}
          onCancel={handleCancelEdit}
        />
      </div>
    );
  }


  if (isCreating) {
    return (
      <div className={styles.projectsContainer}>
        <CreateProjectForm
          onSave={handleSaveProject}
          onCancel={() => setIsCreating(false)}
        />
      </div>
    );
  }

  return (
    <div className={styles.projectsContainer}>
      {/* Header Section */}
      <div className={styles.header}>
        <button
          className={styles.createButton}
          onClick={() => setIsCreating(true)}
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      {/* Content Section */}
      <div className={styles.content}>
        {/* Controls Bar */}
        <div className={styles.controlsBar}>
          <div className={styles.showEntries}>
            <button className={styles.showLabel}>Show Entries</button>
            <span className={styles.entriesValue}>{projectsData.length}</span>
          </div>

          <SearchBar
            data={projectsData}
            setFilteredData={setFilteredProjects}
            searchKeys={["name", "description"]}
          />
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
                      <span className={styles.projectDescription}>
                        {project.description}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.actionButtons}>
                        <button className={styles.editButton} onClick={() => handleEditProject(project)}>
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
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + showEntries, filteredProjects.length)} Entries
          </span>
          <div className={styles.pagination}>
            <button
              className={styles.paginationButton}
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`${styles.paginationButton} ${styles.paginationActive}`}
            >
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
