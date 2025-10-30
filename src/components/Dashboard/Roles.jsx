import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import styles from "./Roles.module.css";
import CreateRoleForm from "./CreateRoleForm";
import EditRoleForm from "./EditRoleForm";
import SearchBar from "../Dashboard/SearchBar";
import Pagination from "../Dashboard/Pagination";
import ReusableTable from "../Dashboard/Table";
function Roles() {
  const sampleData = [
    { id: 1, name: "Admin", permissions: ["Create-Task", "Assign-Task", "Delete-Task"] },
    { id: 2, name: "Manager", permissions: ["Create-Task", "Assign-Task"] },
    { id: 3, name: "Employee", permissions: ["Create-Task"] },
    { id: 4, name: "Supervisor", permissions: ["Create-Task", "Delete-Task"] },
    { id: 5, name: "Intern", permissions: ["Create-Task"] },
    { id: 6, name: "Contractor", permissions: ["Assign-Task"] },
    { id: 7, name: "Consultant", permissions: ["View-Projects"] },
    { id: 8, name: "Director", permissions: ["Manage-Tasks", "Approve-Reports"] },
  ];

  const showEntries = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [rolesData, setRolesData] = useState(sampleData);
  const [filteredRoles, setFilteredRoles] = useState(sampleData);
  const [displayedRoles, setDisplayedRoles] = useState([]);
  const [editedRole, setEditedRole] = useState(null);

  const totalPages = Math.ceil(filteredRoles.length / showEntries);

  useEffect(() => {
    const startIndex = (currentPage - 1) * showEntries;
    const sliced = filteredRoles.slice(startIndex, startIndex + showEntries);
    setDisplayedRoles(sliced);
  }, [filteredRoles, currentPage]);

  const handleDeleteRole = (id) => {
    const updated = rolesData.filter((r) => r.id !== id);
    setRolesData(updated);
    setFilteredRoles(updated);
  };

  const handleEditRole = (role) => setEditedRole(role);

  const handleUpdateRole = (updatedRole) => {
    const updated = rolesData.map((r) => (r.id === updatedRole.id ? updatedRole : r));
    setRolesData(updated);
    setFilteredRoles(updated);
    setEditedRole(null);
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (item) => <span className={styles.roleName}>{item.name}</span>,
    },
    {
      key: "permissions",
      label: "Permissions",
      render: (item) => (
        <div className={styles.permissionTags}>
          {item.permissions.map((p, i) => (
            <span key={i} className={styles.permissionTag}>
              {p}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <div className={styles.actionButtons}>
          <button onClick={() => handleEditRole(item)} className={styles.editButton}>
            <Edit size={16} />
          </button>
          <button onClick={() => handleDeleteRole(item.id)} className={styles.deleteButton}>
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.permissionsContainer}>
      {isCreating ? (
        <CreateRoleForm onCancel={() => setIsCreating(false)} />
      ) : editedRole ? (
        <EditRoleForm
          roleData={editedRole}
          onSave={handleUpdateRole}
          onCancel={() => setEditedRole(null)}
        />
      ) : (
        <>
          <div className={styles.header}>
            <button className={styles.createButton} onClick={() => setIsCreating(true)}>
              <Plus size={16} /> Create Role
            </button>
          </div>

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

          {/* ✅ Using ReusableTable */}
          <ReusableTable
            data={displayedRoles}
            columns={columns}
            startIndex={(currentPage - 1) * showEntries}
            emptyMessage="No matching roles found"
            showIndex={false}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            totalItems={filteredRoles.length}
            displayedItems={displayedRoles.length}
          />
        </>
      )}
    </div>
  );
}

export default Roles;
