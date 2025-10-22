import React, { useState } from "react";
import styles from "./CreateProjectForm.module.css";

function CreateProjectForm({ onSave, onCancel }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !description.trim()) return;
        onSave({ name, description });
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
                        placeholder="Enter Description..."
                        className={styles.input}
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.saveButton}>
                        Save
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

export default CreateProjectForm;
