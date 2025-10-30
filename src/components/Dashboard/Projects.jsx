import React, { useState, useEffect, useMemo } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import styles from "./Projects.module.css";
import CreateProjectForm from "./CreateProjectForm";
import EditProjectForm from "./EditProjectForm";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import ReusableTable from "./Table";

export default function Projects() {
  console.log("Dashboard Projects component rendered");

  const initialProjectsData = [
    { id: 1, name: "Project Alpha", description: "Description for Project Alpha" },
    { id: 2, name: "Project Beta", description: "Description for Project Beta" },
    { id: 3, name: "Project Gamma", description: "Description for Project Gamma" },
  ];

  const [projectsData, setProjectsData] = useState(initialProjectsData);
  const [filteredProjects, setFilteredProjects] = useState(initialProjectsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [editedProject, setEditedProject] = useState(null);
  const showEntries = 12;

  useEffect(() => {
    setFilteredProjects(projectsData);
  }, [projectsData]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const displayedProjects = useMemo(
    () => filteredProjects.slice(startIndex, startIndex + showEntries),
    [filteredProjects, startIndex, showEntries]
  );

  // Handlers
  const handleDeleteProject = (id) => {
    setProjectsData((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSaveProject = (newProject) => {
    setProjectsData((prev) => [
      ...prev,
      { id: Date.now(), name: newProject.name, description: newProject.description },
    ]);
    setIsCreating(false);
  };

  const handleEditProject = (project) => setEditedProject(project);

  const handleUpdateProject = (updated) => {
    setProjectsData((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditedProject(null);
  };

  const handleCancelEdit = () => setEditedProject(null);

  // Columns for ReusableTable
  const columns = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <div className={styles.actionButtons}>
          <button className={styles.editButton} onClick={() => handleEditProject(item)}>
            <Edit size={14} />
          </button>
          <button className={styles.deleteButton} onClick={() => handleDeleteProject(item.id)}>
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  // Conditional rendering
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
        <CreateProjectForm onSave={handleSaveProject} onCancel={() => setIsCreating(false)} />
      </div>
    );
  }

  return (
    <div className={styles.projectsContainer}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.createButton} onClick={() => setIsCreating(true)}>
          <Plus size={16} /> New Project
        </button>
      </div>

      {/* Search + Info Bar */}
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

      {/* Reusable Table */}
      <div className={styles.tableWrapper}>
        <ReusableTable
          data={displayedProjects}
          columns={columns}
          startIndex={startIndex}
          emptyMessage="No matching projects found"
          showIndex={false}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        totalItems={filteredProjects.length}
        displayedItems={showEntries}
      />
    </div>
  );
}
