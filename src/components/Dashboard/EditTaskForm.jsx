import React, { useState } from "react";
import {
  ChevronDown,
  UploadCloud,
  Trash2,
  CircleDot,
  Edit2Icon,
} from "lucide-react";
import styles from "./EditTaskForm.module.css";

function EditTaskForm({ onClose, onSave, taskData }) {
  const [formData, setFormData] = useState({
    project: taskData?.project || "",
    title: taskData?.title || "",
    description: taskData?.description || "",
    assignTo: taskData?.assignTo || "",
    priority: taskData?.priority || "",
    status: taskData?.status || "",
  });

  const [attachments, setAttachments] = useState([
    { id: 1, name: "Screenshot At Sep 23 00-19-42.png", uploadedBy: "Admin", isNew: false },
    { id: 2, name: "Screenshot At Sep 23 00-19-42.png", uploadedBy: "Admin", isNew: false },
    { id: 3, name: "Screenshot At Sep 23 00-19-42.png", uploadedBy: "Admin", isNew: false },
  ]);

  // 🔹 handle text/select input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle file upload (both click and drop)
  const handleFileUpload = (file) => {
    if (file) {
      const newAttachment = {
        id: Date.now(),
        name: file.name,
        uploadedBy: "You",
        file, // Keep actual file reference
        isNew: true,
      };
      setAttachments((prev) => [...prev, newAttachment]);
    }
  };

  const handleInputChange = (e) => {
    handleFileUpload(e.target.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  // 🔹 Delete attachment
  const handleDeleteAttachment = (id) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id));
  };

  // 🔹 Save task
const handleSave = () => {
  if (formData.title.trim()) {
    // Combine all updated data and attachments
    const updatedTask = {
      ...taskData,        // Keep old data like ID or createdAt
      ...formData,        // Replace edited fields
      attachments,        // Include existing + new attachments
      updatedAt: new Date().toISOString(),
    };

    onSave(updatedTask);  // Send to parent (Tasks list)
    onClose();            // Close form
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <div className={styles.formContainer}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.editButton} type="button">
          <Edit2Icon size={16} />
          Edit Task
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Project Dropdown */}
        <div className={styles.inputWrapper}>
          <select
            name="project"
            value={formData.project}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select Project</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="design">Design</option>
          </select>
          <ChevronDown className={styles.dropdownIcon} size={18} />
        </div>

        {/* Title */}
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        {/* Description */}
        <div className={styles.inputGroup}>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
            rows={4}
          />
        </div>

        {/* Assign To and Priority */}
        <div className={styles.row}>
          <div className={styles.inputWrapper}>
            <select
              name="assignTo"
              value={formData.assignTo}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Assign To</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
            </select>
            <ChevronDown className={styles.dropdownIcon} size={18} />
          </div>
          <div className={styles.inputWrapper}>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <ChevronDown className={styles.dropdownIcon} size={18} />
          </div>
        </div>

        {/* Status */}
        <div className={styles.inputWrapper}>
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={formData.status}
            onChange={handleChange}
            className={styles.input}
          />
          <CircleDot size={16} className={styles.statusIcon} />
        </div>

        {/* Existing + New Attachments */}
        <div className={styles.attachmentsSection}>
          <h3 className={styles.attachmentsTitle}>Attachments</h3>
          <div className={styles.attachmentsList}>
            {attachments.map((attachment) => (
              <div key={attachment.id} className={styles.attachmentItem}>
                <div className={styles.attachmentInfo}>
                  <p className={styles.attachmentName}>{attachment.name}</p>
                  <p className={styles.attachmentMeta}>
                    Uploaded By: {attachment.uploadedBy}
                    {attachment.isNew && (
                      <span className={styles.newTag}> (New)</span>
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.deleteAttachment}
                  onClick={() => handleDeleteAttachment(attachment.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Area */}
        <div
          className={styles.uploadArea}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="fileUpload"
            accept=".svg,.png,.jpg,.jpeg,.gif"
            onChange={handleInputChange}
            className={styles.fileInput}
          />
          <label htmlFor="fileUpload" className={styles.uploadLabel}>
            <UploadCloud className={styles.uploadIcon} size={24} />
            <div>
              <span className={styles.clickText}>Click to upload</span>
              <span className={styles.dragText}> or drag and drop</span>
            </div>
            <p className={styles.fileTypes}>SVG, PNG, JPG or GIF</p>
          </label>
        </div>

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} type="button" onClick={onClose}>
            Cancel
          </button>
          <button className={styles.saveButton} type="submit">
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTaskForm;
