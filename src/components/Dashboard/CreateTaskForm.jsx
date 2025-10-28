import React, { useState } from "react";
import { Calendar, ChevronDown, CircleDot, Upload, X } from "lucide-react";
import styles from "./CreateTaskForm.module.css";

function CreateTaskForm({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    dueDate: "",
    priority: "",
    assignTo: "",
    description: "",
    files: [], // ✅ store multiple files here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...files], // append new files
      }));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...files],
      }));
    }
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    console.log("Saving data:", formData);
    if (formData.title.trim()) {
      onSave(formData);
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
        <button className={styles.createButton}>Create Task</button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
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
          {/* <span className={styles.requiredIcon}>⊗</span> */}
          <CircleDot className={styles.requiredIcon} size={18} />
        </div>

        {/* Date and Due Date */}
        <div className={styles.row}>
          <div className={styles.inputWrapper}>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={styles.input}
            />
            {/* <Calendar className={styles.calendarIcon} size={18} /> */}
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={styles.input}
            />
            {/* <Calendar className={styles.calendarIcon} size={18} /> */}
          </div>
        </div>

        {/* Priority and Assign To */}
        <div className={styles.row}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="priority"
              placeholder="Priority"
              value={formData.priority}
              onChange={handleChange}
              className={styles.input}
            />
            {/* <span className={styles.priorityIcon}>⊗</span> */}
                      <CircleDot className={styles.requiredIcon} size={18} />
          </div>
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

        {/* File Upload */}
        <div
          className={styles.uploadArea}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="fileUpload"
            accept=".svg,.png,.jpg,.jpeg,.gif"
            multiple //  allow multiple selection
            onChange={handleFileUpload}
            className={styles.fileInput}
          />
          <label htmlFor="fileUpload" className={styles.uploadLabel}>
            <Upload className={styles.uploadIcon} size={24} />
            <div>
              <span className={styles.clickText}>Click to upload</span>
              <span className={styles.dragText}> or drag and drop</span>
            </div>
            <p className={styles.fileTypes}>SVG, PNG, JPG or GIF</p>
          </label>
        </div>

        {/* Uploaded Files List */}
        {formData.files.length > 0 && (
          <div className={styles.attachmentsSection}>
            <h3 className={styles.attachmentsTitle}>Uploaded Attachments</h3>
            {formData.files.map((file, index) => (
              <div key={index} className={styles.attachmentItem}>
                <div className={styles.attachmentInfo}>
                  <p className={styles.attachmentName}>{file.name}</p>
                  <p className={styles.attachmentMeta}>
                    Size: {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.deleteAttachment}
                  onClick={() => removeFile(index)}
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

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

export default CreateTaskForm;
