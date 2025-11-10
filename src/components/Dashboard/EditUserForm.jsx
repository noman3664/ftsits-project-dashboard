import { ArrowLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import styles from "./EditUserForm.module.css";
const EditUserForm = ({ userData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: 'user',
        status: 'active',
    });

    const [errors, setErrors] = useState({});

    // Load user data into form when editing
    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || '',
                email: userData.email || '',
                phone: userData.phone || '',
                role: userData.role || 'user',
                status: userData.status || 'active',
                password: '',
                confirmPassword: '',
            });
        }
    }, [userData]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) newErrors.phone = 'Phone number is invalid';

        // Password validation (optional)
        if (formData.password && formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password || formData.confirmPassword) {
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const updatedData = {
            id: userData.id,
            ...formData,
        };

        // If password fields are blank, don’t update password
        if (!formData.password.trim()) {
            delete updatedData.password;
        }
        delete updatedData.confirmPassword;

        onSave(updatedData);
    };

    return (
        <div>
            {/* Header */}
            <div className={styles.header}>
                <button
                    onClick={onCancel}
                    className={styles.backButton}>
                    <ArrowLeft size={18} />
                    Back to List
                </button>
            </div>

            {/* Content */}
            <div className={styles.content}>
                <div className={styles.formWrapper}>
                    <h2 className={styles.topHeader}>Edit User</h2>

                    <form onSubmit={handleSubmit} className="grid gap-4">
                        {/* Name */}
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter user name"
                                className={`px-4 py-2 text-sm border rounded outline-none transition-all ${errors.name
                                        ? 'border-[#F93131]'
                                        : 'border-gray-300 focus:border-[#FFA800] focus:ring-2 focus:ring-[#FFA800] focus:ring-opacity-20'
                                    }`}
                            />
                            {errors.name && <span className="text-[#F93131] text-xs mt-1">{errors.name}</span>}
                        </div>

                        {/* Email */}
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter email address"
                                className={`px-4 py-2 text-sm border rounded outline-none transition-all ${errors.email
                                        ? 'border-[#F93131]'
                                        : 'border-gray-300 focus:border-[#FFA800] focus:ring-2 focus:ring-[#FFA800] focus:ring-opacity-20'
                                    }`}
                            />
                            {errors.email && <span className="text-[#F93131] text-xs mt-1">{errors.email}</span>}
                        </div>

                        {/* Password (optional) */}
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>New Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Leave blank to keep current password"
                                className={`px-4 py-2 text-sm border rounded outline-none transition-all ${errors.password
                                        ? 'border-[#F93131]'
                                        : 'border-gray-300 focus:border-[#FFA800] focus:ring-2 focus:ring-[#FFA800] focus:ring-opacity-20'
                                    }`}
                            />
                            {errors.password && <span className="text-[#F93131] text-xs mt-1">{errors.password}</span>}
                        </div>

                        {/* Confirm Password */}
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm password if changing"
                                className={`px-4 py-2 text-sm border rounded outline-none transition-all ${errors.confirmPassword
                                        ? 'border-[#F93131]'
                                        : 'border-gray-300 focus:border-[#FFA800] focus:ring-2 focus:ring-[#FFA800] focus:ring-opacity-20'
                                    }`}
                            />
                            {errors.confirmPassword && (
                                <span className="text-[#F93131] text-xs mt-1">{errors.confirmPassword}</span>
                            )}
                        </div>

                        {/* Phone */}
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Phone *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter phone number"
                                className={`px-4 py-2 text-sm border rounded outline-none transition-all ${errors.phone
                                        ? 'border-[#F93131]'
                                        : 'border-gray-300 focus:border-[#FFA800] focus:ring-2 focus:ring-[#FFA800] focus:ring-opacity-20'
                                    }`}
                            />
                            {errors.phone && <span className="text-[#F93131] text-xs mt-1">{errors.phone}</span>}
                        </div>

                        {/* Role */}
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Role *</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className="px-4 py-2 text-sm border border-gray-300 rounded outline-none transition-all focus:border-[#FFA800] focus:ring-2 focus:ring-[#FFA800] focus:ring-opacity-20"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Status *</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="px-4 py-2 text-sm border border-gray-300 rounded outline-none transition-all focus:border-[#FFA800] focus:ring-2 focus:ring-[#FFA800] focus:ring-opacity-20"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className={styles.buttonGroup}>
                            <button
                                type="submit"
                                className={styles.saveButton}
                            >
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
            </div>
        </div>
    );
};

export default EditUserForm;
