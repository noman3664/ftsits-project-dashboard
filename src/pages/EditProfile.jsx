import React, { useState, useEffect } from "react";
import { User, Mail, Phone, Briefcase, Lock, Camera, Eye, EyeOff } from "lucide-react";
import styles from "./EditProfile.module.css";

export default function EditProfile() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        image: "",
    });

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(true);

    // Load user data from localStorage (mock)
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            // Add mock image if missing
            setUser({
                ...storedUser,
                phone: storedUser.phone || "+1 (000) 000-0000",
                image:
                    storedUser.image || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            });
        }
        setLoading(false);
    }, []);

    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
    const handlePasswordChange = (e) =>
        setPasswords({ ...passwords, [e.target.name]: e.target.value });

    const togglePasswordVisibility = (field) => {
        setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
    };

    //  Save updated profile locally (mock update)
    const handleSave = () => {
        localStorage.setItem("user", JSON.stringify(user));
        alert("Profile updated successfully!");
    };

    // Update password (mock check)
    const handlePasswordUpdate = () => {
        if (passwords.newPassword !== passwords.confirmPassword)
            return alert("New passwords don't match!");
        if (passwords.newPassword.length < 8)
            return alert("Password must be at least 8 characters!");
        alert("Password updated successfully!");
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    };

    // Mock image upload (local preview only)
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const updatedUser = { ...user, image: reader.result };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser)); // Save update
        };
        reader.readAsDataURL(file);
    };

    if (loading) return <div className="text-center py-10">Loading profile...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* Header */}
                <div className={styles.card}>
                    <h1 className={styles.cardHeader}>Profile Settings</h1>
                    <p className={styles.cardSubtext}>Manage your account information and security</p>
                </div>

                {/* Profile Picture */}
                <div className={styles.card}>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className={styles.imageWrapper}>
                            <img
                                src={user.image || "/default-avatar.png"}
                                alt="Profile"
                                className={styles.profileImage}
                            />
                            <label className={styles.cameraLabel}>
                                <Camera size={20} />
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className={styles.userName}>{user.name}</h2>
                            <p className="text-gray-600">{user.role}</p>
                            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className={styles.card}>
                    <div className={styles.tabContainer}>
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`${styles.tabButton} ${activeTab === "profile" ? styles.tabActive : ""}`}
                        >
                            Profile Information
                        </button>
                        <button
                            onClick={() => setActiveTab("password")}
                            className={`${styles.tabButton} ${activeTab === "password" ? styles.tabActive : ""}`}
                        >
                            Change Password
                        </button>
                    </div>

                    {/* Profile Info Tab */}
                    {activeTab === "profile" && (
                        <div className={styles.tabContent}>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {["name", "email", "phone", "role"].map((field) => (
                                        <div key={field} className={styles.inputGroup}>
                                            <label className={styles.label}>
                                                {field === "name" && <User size={16} />}
                                                {field === "email" && <Mail size={16} />}
                                                {field === "phone" && <Phone size={16} />}
                                                {field === "role" && <Briefcase size={16} />}
                                                {field === "name"
                                                    ? "Full Name"
                                                    : field === "email"
                                                        ? "Email Address"
                                                        : field === "phone"
                                                            ? "Contact Number"
                                                            : "Role / Position"}
                                            </label>
                                            <input
                                                name={field}
                                                value={user[field] || ""}
                                                onChange={handleChange}
                                                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                                                className={styles.input}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.buttonRow}>
                                    <button onClick={handleSave} className={styles.saveButton}>
                                        Save Changes
                                    </button>
                                    <button onClick={() => window.history.back()} className={styles.cancelButton}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Password Tab */}
                    {activeTab === "password" && (
                        <div className={styles.tabContent}>
                            <div className="space-y-6 max-w-xl">
                                <div className={styles.infoBox}>
                                    <div className="flex gap-2">
                                        <Lock size={20} className="text-[#F93131] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-[#F93131]">Password Requirements</p>
                                            <ul className="text-sm text-[#F93131] mt-2 space-y-1">
                                                <li>• At least 8 characters long</li>
                                                <li>• Include uppercase and lowercase letters</li>
                                                <li>• Include at least one number</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {["current", "new", "confirm"].map((field) => (
                                    <div key={field} className={styles.inputGroup}>
                                        <label className={styles.label}>
                                            {field === "current"
                                                ? "Current Password"
                                                : field === "new"
                                                    ? "New Password"
                                                    : "Confirm New Password"}
                                        </label>
                                        <div className="relative">
                                            <input
                                                name={`${field}Password`}
                                                type={showPasswords[field] ? "text" : "password"}
                                                value={passwords[`${field}Password`]}
                                                onChange={handlePasswordChange}
                                                className={styles.input}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility(field)}
                                                className={styles.eyeButton}
                                            >
                                                {showPasswords[field] ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <div className={styles.buttonRow}>
                                    <button onClick={handlePasswordUpdate} className={styles.updateButton}>
                                        Update Password
                                    </button>
                                    <button
                                        onClick={() =>
                                            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" })
                                        }
                                        className={styles.cancelButton}
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
