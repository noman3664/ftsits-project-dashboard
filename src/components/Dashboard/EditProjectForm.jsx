import React, { useState } from "react";
import styles from "./EditProjectForm.module.css";

export default function EditProjectForm({ projectData, onSave, onCancel }) {
  const [name, setName] = useState(projectData.name);
  const [description, setDescription] = useState(projectData.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: projectData.id, name, description });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Project Name..."
            className={styles.input}
          />
        </div>
        <div className={styles.inputWrapper}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.saveButton}>
            Update
          </button>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
