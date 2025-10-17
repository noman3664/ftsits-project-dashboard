import React, { useState } from "react";
import { Trash2, Upload, ChevronDown } from "lucide-react";
import styles from "./ViewTaskPage.module.css";
function ViewTaskPage() {
    const [comment, setComment] = useState("");
    // const [selectedFile, setSelectedFile] = useState(null);

    const taskDetails = {
        title: "First Task: Fix Project Frontend For Assigning Of The User S",
        createdBy: "Admin",
        assignedTo: "User1",
        priority: "Low",
        status: "Open"
    };

    const existingAttachments = [
        { id: 1, name: "Screenshot At Sep 23 00-19-42png", uploadedBy: "Admin" },
        { id: 2, name: "Screenshot At Sep 23 00-19-42png", uploadedBy: "Admin" },
        { id: 3, name: "Screenshot At Sep 23 00-19-42png", uploadedBy: "Admin" }
    ];

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // setSelectedFile(file);
        }
    };

    const handleAddComment = () => {
        if (comment.trim()) {
            console.log("Comment:", comment);
            setComment("");
        }
    };

    return (
        <div className={styles.container}>
            {/* Edit Task Button */}
            <div className={styles.header}>
                <button className={styles.editButton}>
                    <span className={styles.icon}>≡</span>
                    Edit Task
                </button>
            </div>

            {/* Details Section */}
            <div className={styles.card}>
                <h2 className={styles.sectionTitle}>Details</h2>
                <div className={styles.detailsContent}>
                    <p className={styles.taskTitle}>{taskDetails.title}</p>
                    <p className={styles.detailRow}>Created By: {taskDetails.createdBy}</p>
                    <p className={styles.detailRow}>Assigned To: {taskDetails.assignedTo}</p>
                    <p className={styles.detailRow}>Priority: {taskDetails.priority}</p>

                    <div className={styles.statusRow}>
                        <span className={styles.detailRow}>Status</span>
                        <span className={styles.statusBadge}>{taskDetails.status}</span>
                    </div>

                    {/* Dropdown */}
                    <div className={styles.dropdownWrapper}>
                        <select className={styles.dropdown}>
                            <option>Select Option</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                        </select>
                        <ChevronDown className={styles.dropdownIcon} size={18} />
                    </div>

                    {/* Update Button */}
                    <button className={styles.actionButton}>Update</button>

                    {/* Description Textarea */}
                    <textarea
                        className={styles.textarea}
                        placeholder="Description..."
                        rows={4}
                    />

                    {/* reassign Button */}
                    <button className={styles.submitButton}>Reassign</button>

                    {/* Existing Attachments */}
                    <div className={styles.attachmentsSection}>
                        <h3 className={styles.attachmentsTitle}>Existing Attachments</h3>
                        <div className={styles.attachmentsList}>
                            {existingAttachments.map((attachment) => (
                                <div key={attachment.id} className={styles.attachmentItem}>
                                    <div className={styles.attachmentInfo}>
                                        <p className={styles.attachmentName}>{attachment.name}</p>
                                        <p className={styles.attachmentMeta}>
                                            Uploaded By: {attachment.uploadedBy}
                                        </p>
                                    </div>
                                    <button className={styles.deleteAttachment}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className={styles.card}>
                <h2 className={styles.sectionTitle}>Comments</h2>
                <div className={styles.commentsContent}>
                    <textarea
                        className={styles.commentTextarea}
                        placeholder="Write..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                    />

                    {/* File Upload Area */}
                    <div className={styles.uploadArea}>
                        <input
                            type="file"
                            id="commentFile"
                            className={styles.fileInput}
                            onChange={handleFileUpload}
                        />
                        <label htmlFor="commentFile" className={styles.uploadLabel}>
                            <Upload className={styles.uploadIcon} size={20} />
                            <div className={styles.uploadText}>
                                <span className={styles.uploadLink}>Click to upload</span> or drag and drop<br />
                                SVG, PNG, JPG or GIF
                            </div>
                        </label>
                    </div>

                    <button className={styles.addCommentButton} onClick={handleAddComment}>
                        Add Comment
                    </button>
                </div>
            </div>

            {/* Reassignment History Section */}
            <div className={styles.card}>
                <h2 className={styles.sectionTitle}>Reassignment History</h2>
                <p className={styles.noData}>No Reassignments Yet</p>
            </div>
        </div>
    );
}

export default ViewTaskPage;