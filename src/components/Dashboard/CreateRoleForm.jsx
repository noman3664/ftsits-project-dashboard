import React from "react";
import styles from "./CreateRoleForm.module.css";

export default function CreateRoleForm({ onCancel }) {
  const permissions = Array(20).fill("Manage-Project");

  return (
    <div className={styles.formContainer}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <input
          type="text"
          placeholder="Enter Name"
          className={styles.inputField}
        />
      </div>

      {/* Permissions Title */}
      <div className={styles.permissionsHeader}>Permissions</div>

      {/* Permissions Grid */}
      <div className={styles.permissionsGrid}>
        {permissions.map((perm, index) => (
          <label key={index} className={styles.permissionItem}>
            <input type="checkbox" className={styles.checkbox} />
            {perm}
          </label>
        ))}
      </div>

      {/* Buttons */}
      <div className={styles.buttonGroup}>
        <button className={styles.saveButton}>Save</button>
        <button onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
}
