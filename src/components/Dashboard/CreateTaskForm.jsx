import React, { useState } from "react";
import { Calendar, ChevronDown, Upload, X } from "lucide-react";
import styles from "./CreateTaskForm.module.css";

function CreateTaskForm({ onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        dueDate: "",
        priority: "",
        assignTo: "",
        description: "",
        file: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, file }));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, file }));
        }
    };

    const handleSave = () => {
        if (formData.title.trim()) {
            onSave(formData);
            setFormData({
                title: "",
                date: "",
                dueDate: "",
                priority: "",
                assignTo: "",
                description: "",
                file: null,
            });
        }
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave();
    };

    return (
        <div className={styles.formContainer}>
            {/* Header */}
            <div className={styles.header}>
                <button className={styles.createButton}>
                    Create Task
                </button>
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
                    <span className={styles.requiredIcon}>⊗</span>
                </div>

                {/* Date and Due Date */}
                <div className={styles.row}>
                    <div className={styles.inputWrapper}>
                        <input
                            type="date"
                            name="date"
                            placeholder="Date"
                            value={formData.date}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <Calendar className={styles.calendarIcon} size={18} />
                    </div>
                    <div className={styles.inputWrapper}>
                        <input
                            type="date"
                            name="dueDate"
                            placeholder="Due Date"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <Calendar className={styles.calendarIcon} size={18} />
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
                        <span className={styles.priorityIcon}>⊗</span>
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