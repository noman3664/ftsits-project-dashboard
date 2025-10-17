import React, { useState } from "react";
import styles from "./CreatePermissionForm.module.css"; // Import CSS module

export default function CreatePermissionForm({ onCancel, onSave }) {
  const [permissionName, setPermissionName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!permissionName.trim()) return;
    onSave(permissionName);
    setPermissionName("");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={permissionName}
            onChange={(e) => setPermissionName(e.target.value)}
            placeholder="Enter Name"
            className={styles.input}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
          <button type="button" onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
