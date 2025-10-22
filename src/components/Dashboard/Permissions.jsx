import React, { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import styles from "./Permissions.module.css";
import CreatePermissionForm from "./CreatePermissionForm";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import EditPermissions from "./EditPermissions";

export default function Permissions() {
  const initialPermissionsData = [
    { name: "Create-Task" },
    { name: "Assign-Task" },
    { name: "Delete-Task" },
    { name: "View-Projects" },
    { name: "Manage-Tasks" },
  ];

  const [isCreating, setIsCreating] = useState(false);
  const [permissionsData, setPermissionsData] = useState(initialPermissionsData);
  const [filteredPermissions, setFilteredPermissions] = useState(permissionsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedPermission, setEditedPermission] = useState(null);
  const itemsPerPage = 3;


  // Calculate total pages
  const totalPages = Math.ceil(filteredPermissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedPermissions = filteredPermissions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSave = (newPermission) => {
    const updated = [...permissionsData, newPermission];
    setPermissionsData(updated);
    setFilteredPermissions(updated);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditedPermission(null);
  };
  const handleUpdatePermission = (updatedPermission) => {
    const updated = permissionsData.map((perm) =>
      perm.name === editedPermission.name ? updatedPermission : perm
    );
    setPermissionsData(updated);
    setFilteredPermissions(updated);
    setEditedPermission(null);
  };

  const handleDeletePermission = (permissionName) => {
    const updated = permissionsData.filter(
      (perm) => perm.name !== permissionName
    );
    setPermissionsData(updated);
    setFilteredPermissions(updated);
  };

  const handleEditPermission = (permission) => {
    setEditedPermission(permission);
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      {!isCreating && (
        <div className={styles.header}>
          <button onClick={() => setIsCreating(true)} className={styles.createButton}>
            <Plus size={16} />
            Create Permission
          </button>
        </div>
      )}

      {/* Show Create Form */}
      {isCreating ? (
        <CreatePermissionForm onCancel={handleCancel} onSave={handleSave} />
      ) : editedPermission ? (
        <EditPermissions
          permissionData={editedPermission}
          onSave={handleUpdatePermission}
          onCancel={handleCancel}
        />
      ) : (
        <>
          {/* Controls Bar */}
          <div className={styles.controlsBar}>
            <div className={styles.showEntries}>
              <button className={styles.showButton}>Show Entries</button>
              <span className={styles.entriesCount}>{permissionsData.length}</span>
            </div>

            <SearchBar
              data={permissionsData}
              setFilteredData={setFilteredPermissions}
              searchKeys={["name"]}
            />
          </div>

          {/* Table Section */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {displayedPermissions.length > 0 ? (
                  displayedPermissions.map((perm) => (
                    <tr key={perm.name}
                      className={styles.tableRow}>
                      <td className={styles.td}>{perm.name}</td>
                      <td className={styles.td}>
                        <div className={styles.actionButtons}>
                          <button className={styles.editButton} onClick={() => handleEditPermission(perm)}>
                            <Edit size={16} />
                          </button>
                          <button className={styles.deleteButton} onClick={() => handleDeletePermission(perm.name)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className={styles.noData}>
                      No permissions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              totalItems={filteredPermissions.length}
              displayedItems={itemsPerPage}
            />
          )}

        </>
      )}
    </div>
  );
}
