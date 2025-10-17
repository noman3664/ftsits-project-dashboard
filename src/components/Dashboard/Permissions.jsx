import React, { useState } from "react";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import styles from "./Permissions.module.css";
import CreatePermissionForm from "./CreatePermissionForm"; // import the form component

export default function Permissions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const permissionsData = Array(10).fill({ name: "Assign-Task" });

  // Handle Save and Cancel actions
  const handleSave = (newPermission) => {
    console.log("Saved:", newPermission);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setIsCreating(false);
  };

  return (
    <div className={styles.container}>
{/* Header Section */}
{!isCreating && (
  <div className={styles.header}>
    <button
      onClick={() => setIsCreating(true)}
      className={styles.createButton}
    >
      <Plus size={16} />
      Create Permission
    </button>
  </div>
)}


      {/* Show Create Form */}
      {isCreating ? (
        <CreatePermissionForm onCancel={handleCancel} onSave={handleSave} />
      ) : (
        <>
          {/* Controls Bar */}
          <div className={styles.controlsBar}>
            <div className={styles.showEntries}>
              <button className={styles.showButton}>Show Entries</button>
              <span className={styles.entriesCount}>
                {permissionsData.length}
              </span>
            </div>

            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search anything here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <Search size={18} className={styles.searchIcon} />
            </div>
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
                {permissionsData.map((perm, index) => (
                  <tr key={index} className={styles.tableRow}>
                    <td className={styles.td}>{perm.name}</td>
                    <td className={styles.td}>
                      <div className={styles.actionButtons}>
                        <button className={styles.editButton}>
                          <Edit size={16} />
                        </button>
                        <button className={styles.deleteButton}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Section */}
          <div className={styles.footer}>
            <span className={styles.footerText}>Showing 1 To 10 Entries</span>
            <div className={styles.pagination}>
              <button className={styles.prevButton}>Previous</button>
              <button className={styles.activePage}>1</button>
              <button className={styles.nextButton}>Next</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
