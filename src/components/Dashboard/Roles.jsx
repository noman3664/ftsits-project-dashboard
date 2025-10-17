import React, { useState, useMemo } from "react";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import styles from "./Roles.module.css";
import CreateRoleForm from "./CreateRoleForm";


function Roles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showEntries, setShowEntries] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

const [isCreating, setIsCreating] = useState(false);
const [rolesData, setRolesData] = useState([
  {
    id: 1,
    name: "Admin",
    permissions: [
      "Manage-Project", "Create-Projects", "View-Projects", "Manage-Tasks",
      "Create-Tasks", "Reassign-Tasks", "View-Tasks", "Update-Own-Task-Status",
      "Reassign-Own-Task", "Manage-User", "Manage-Roles", "Manage-Permissions"
    ],
  },
  {
    id: 2,
    name: "Manager",
    permissions: [
      "Manage-Project", "Create-Projects", "View-Projects", "Manage-Tasks",
      "Create-Tasks", "Reassign-Tasks", "View-Tasks",
    ],
  },
  {
    id: 3,
    name: "Member",
    permissions: [
      "Manage-Project", "Create-Projects", "View-Projects", "Manage-Tasks",
      "Create-Tasks", "Reassign-Tasks", "View-Tasks",
    ],
  },
  ...Array.from({ length: 25 }, (_, i) => ({
    id: i + 4,
    name: `Role ${i + 4}`,
    permissions: ["View-Projects", "Manage-Tasks"],
  })),
]);

  // Filtered roles by search
  const filteredRoles = useMemo(() => {
    return rolesData.filter(
      (role) =>
        role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.permissions.some((perm) =>
          perm.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [searchQuery, rolesData]);

  // Pagination
  const totalPages = Math.ceil(filteredRoles.length / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const displayedRoles = filteredRoles.slice(startIndex, startIndex + showEntries);
  //
  const handleSaveRole = (newRole) => {
  setRolesData((prev) => [...prev, newRole]);
  setIsCreating(false); // go back to table view
};

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

 return (
  <div className={styles.permissionsContainer}>
    {isCreating ? (
      // Create Role Form
      <CreateRoleForm
        onSave={handleSaveRole}
        onCancel={() => setIsCreating(false)}
      />
    ) : (
      <>
        {/* Header Section */}
        <div className={styles.header}>
          <button
            className={styles.createButton}
            onClick={() => setIsCreating(true)}
          >
            <Plus size={16} />
            Create Role
          </button>
        </div>

        {/* Content Section */}
        <div className={styles.content}>
          {/* Controls Bar */}
          <div className={styles.controlsBar}>
            <div className={styles.showEntries}>
              <span className={styles.showLabel}>Show Entries</span>
              <select
                value={showEntries}
                onChange={(e) => {
                  setShowEntries(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className={styles.entriesSelect}
              >
                <option value={3}>3</option>
                <option value={6}>6</option>
                <option value={9}>9</option>
                <option value={12}>12</option>
              </select>
            </div>

            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search roles or permissions..."
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
                  <th className={styles.th}>Permissions</th>
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {displayedRoles.length > 0 ? (
                  displayedRoles.map((role) => (
                    <tr key={role.id} className={styles.tableRow}>
                      <td className={styles.td}>
                        <span className={styles.roleName}>{role.name}</span>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.permissionTags}>
                          {role.permissions.map((permission, index) => (
                            <span key={index} className={styles.permissionTag}>
                              {permission}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.actionButtons}>
                          <button className={styles.editButton}>
                            <Edit size={16} />
                          </button>
                          <button className={styles.deleteButton}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-6 text-gray-500">
                      No matching roles found
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
              {Math.min(startIndex + showEntries, filteredRoles.length)} of{" "}
              {filteredRoles.length} Entries
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
      </>
    )}
  </div>
);

}

export default Roles;
