import React, { useState, useEffect } from "react";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import styles from "./Roles.module.css";
import CreateRoleForm from "./CreateRoleForm";
import Pagination from "../Dashboard/Pagination";
import SearchBar from "../Dashboard/SearchBar";
import EditRoleForm from "./EditRoleForm";
function Roles() {
    console.log("Dashboard Roles component rendered"); // Debug log

  // Sample roles data
  const sampleData = [
    {
      id: 1,
      name: "Admin",
      permissions: ["Create-Task", "Assign-Task", "Delete-Task"],
    },
    {
      id: 2,
      name: "Manager",
      permissions: ["Create-Task", "Assign-Task"],
    },
    {
      id: 3,
      name: "Employee",
      permissions: ["Create-Task"],
    },
    {
      id: 4,
      name: "Supervisor",
      permissions: ["Create-Task", "Delete-Task"],
    },
    {
      id: 5,
      name: "Intern",
      permissions: ["Create-Task"],
    },
    {
      id: 6,
      name: "Contractor",
      permissions: ["Assign-Task"],
    },
    {
      id: 7,
      name: "Consultant",
      permissions: ["View-Projects"],
    },
    {
      id: 8,
      name: "Director",
      permissions: ["Manage-Tasks", "Approve-Reports"],
    },

  ];
  const showEntries = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [rolesData, setRolesData] = useState(sampleData);
  const [filteredRoles, setFilteredRoles] = useState(rolesData);
  const [displayedRoles, setDisplayedRoles] = useState([]);
  const [editedRole, setEditedRole] = useState(null);


  // Pagination
  const totalPages = Math.ceil(filteredRoles.length / showEntries);

  useEffect(() => {
    const startIndex = (currentPage - 1) * showEntries;
    const sliced = filteredRoles.slice(startIndex, startIndex + showEntries);
    setDisplayedRoles(sliced);
  }, [filteredRoles, currentPage, showEntries]);

  const handleSaveRole = (newRole) => {
    const updated = [...rolesData, newRole];
    setRolesData(updated);
    setFilteredRoles(updated); // ensures new role appears in the paginated view
    setIsCreating(false);
  };

  const handleDeleteRole = (roleId) => {
    const updated = rolesData.filter((role) => role.id !== roleId);
    setRolesData(updated);
    setFilteredRoles(updated);
    const newTotalPages = Math.ceil(updated.length / showEntries);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  const handleEditRole = (role) => {
    setEditedRole(role); // 👈 Set the selected role
  };

  const handleUpdateRole = (updatedRole) => {
    const updatedRoles = rolesData.map((r) =>
      r.id === updatedRole.id ? updatedRole : r
    );
    setRolesData(updatedRoles);
    setFilteredRoles(updatedRoles);
    setEditedRole(null); // close edit form
  };

  return (
    <div className={styles.permissionsContainer}>
      {isCreating ? (
        // Create Role Form
        <CreateRoleForm
          onSave={handleSaveRole}
          onCancel={() => setIsCreating(false)}
        />
      ) : editedRole ? (
        <EditRoleForm
          roleData={editedRole}
          onSave={handleUpdateRole}
          onCancel={() => setEditedRole(null)}
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
                <button className={styles.showLabel}>Show Entries</button>
                <span className={styles.entriesSelect}>{rolesData.length}</span>
              </div>

              <SearchBar
                data={rolesData}
                setFilteredData={setFilteredRoles}
                searchKeys={["name", "permissions"]}
              />
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
                            {role.permissions.map((p, i) => (
                              <span key={i} className={styles.permissionTag}>
                                {p}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className={styles.td}>
                          <div className={styles.actionButtons}>
                            <button
                              className={styles.editButton}
                              onClick={() => handleEditRole(role)}
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className={styles.deleteButton}
                              onClick={() => handleDeleteRole(role.id)}
                            >
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
            {/* <div className={styles.footer}>
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
          </div> */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              totalItems={filteredRoles.length}
              displayedItems={displayedRoles.length}
            />
          </div>
        </>
      )}
    </div>
  );

}

export default Roles;
