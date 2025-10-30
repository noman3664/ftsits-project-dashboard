// src/components/Permissions.jsx
import React, { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import styles from "./Permissions.module.css";
import CreatePermissionForm from "./CreatePermissionForm";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import EditPermissions from "./EditPermissions";
import ReusableTable from "../Dashboard/Table";

export default function Permissions() {
  console.log("Dashboard Permissions component rendered"); // Debug log

  const initialPermissionsData = [
    { id: 1, name: "Create-Task" },
    { id: 2, name: "Assign-Task" },
    { id: 3, name: "Delete-Task" },
    { id: 4, name: "View-Projects" },
    { id: 5, name: "Manage-Tasks" },
  ];

  const [isCreating, setIsCreating] = useState(false);
  const [permissionsData, setPermissionsData] = useState(initialPermissionsData);
  const [filteredPermissions, setFilteredPermissions] = useState(initialPermissionsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedPermission, setEditedPermission] = useState(null);
  const itemsPerPage = 3;

  // Calculate pagination
  const totalPages = Math.ceil(filteredPermissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedPermissions = filteredPermissions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // CRUD handlers
  const handleSave = (newPermission) => {
    const updated = [
      ...permissionsData,
      { id: Date.now(), ...newPermission },
    ];
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
      perm.id === editedPermission.id ? updatedPermission : perm
    );
    setPermissionsData(updated);
    setFilteredPermissions(updated);
    setEditedPermission(null);
  };

  const handleDeletePermission = (permissionId) => {
    const updated = permissionsData.filter((perm) => perm.id !== permissionId);
    setPermissionsData(updated);
    setFilteredPermissions(updated);
  };

  const handleEditPermission = (permission) => {
    setEditedPermission(permission);
  };

  // Columns for ReusableTable
  const columns = [
    { key: "name", label: "Permission Name" },
    {
      key: "actions",
      label: "Actions",
      render: (perm) => (
        <div className={styles.actionButtons}>
          <button
            className={styles.editButton}
            onClick={() => handleEditPermission(perm)}
          >
            <Edit size={16} />
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => handleDeletePermission(perm.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header Section */}
      {!isCreating && !editedPermission && (
        <div className={styles.header}>
          <button onClick={() => setIsCreating(true)} className={styles.createButton}>
            <Plus size={16} />
            Create Permission
          </button>
        </div>
      )}

      {/* Create or Edit Forms */}
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
          {/* Controls */}
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

          {/* Reusable Table */}
          <ReusableTable
            data={displayedPermissions}
            columns={columns}
            startIndex={startIndex}
            showIndex={true}
            emptyMessage="No permissions found"
          />

          {/* Pagination */}
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
