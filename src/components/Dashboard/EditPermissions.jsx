import React, { useState } from "react";
import styles from "./EditPermissions.module.css";

export default function EditPermissions({ permissionData, onSave, onCancel }) {
    const [permissionName, setPermissionName] = useState(permissionData.name);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name: permissionName });
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
