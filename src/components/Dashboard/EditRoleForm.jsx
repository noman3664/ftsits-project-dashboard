import React, { useState } from "react";
import styles from "./EditRoleForm.module.css";

export default function EditRoleForm({ roleData, onSave, onCancel }) {
  const [roleName, setRoleName] = useState(roleData.name);
  const [selectedPermissions, setSelectedPermissions] = useState(roleData.permissions);

  // Sample list of all permissions to display
  const permissions = [
    "Create-Task",
    "Assign-Task",
    "Delete-Task",
    "View-Projects",
    "Manage-Tasks",
    "Approve-Reports",
  ];

  const handlePermissionChange = (perm) => {
    setSelectedPermissions((prev) =>
      prev.includes(perm)
        ? prev.filter((p) => p !== perm)
        : [...prev, perm]
    );
  };

  const handleSave = () => {
    const updatedRole = {
      ...roleData,
      name: roleName,
      permissions: selectedPermissions,
    };
    onSave(updatedRole);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.headerSection}>
        <input
          type="text"
          placeholder="Enter Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className={styles.inputField}
        />
      </div>

      <div className={styles.permissionsHeader}>Roles</div>

      <div className={styles.permissionsGrid}>
        {permissions.map((perm, index) => (
          <label key={index} className={styles.permissionItem}>
            <input
              type="checkbox"
              checked={selectedPermissions.includes(perm)}
              onChange={() => handlePermissionChange(perm)}
              className={styles.checkbox}
            />
            {perm}
          </label>
        ))}
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={handleSave} className={styles.saveButton}>
          Update
        </button>
        <button onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
}
