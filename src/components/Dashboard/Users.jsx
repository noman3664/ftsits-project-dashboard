import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';
import styles from "./Users.module.css";
import SearchBar from "../Dashboard/SearchBar";
import Pagination from "../Dashboard/Pagination";
import ReusableTable from "../Dashboard/Table";
import CreateUserForm from "./CreateUserForm";
import EditUserForm from "./EditUserForm";


const Users = () => {
    const showEntries = 5;
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCreating, setIsCreating] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]);

    const totalPages = Math.ceil(filteredUsers.length / showEntries);

    // Load users from localStorage on mount
    useEffect(() => {
        const savedUsers = localStorage.getItem('users');
        if (savedUsers) {
            const parsed = JSON.parse(savedUsers);
            setUsers(parsed);
            setFilteredUsers(parsed);
        }
    }, []);

    // Save users to localStorage whenever they change
    useEffect(() => {
        if (users.length > 0) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }, [users]);

    // Update displayed users based on pagination
    useEffect(() => {
        const startIndex = (currentPage - 1) * showEntries;
        const sliced = filteredUsers.slice(startIndex, startIndex + showEntries);
        setDisplayedUsers(sliced);
    }, [filteredUsers, currentPage]);

    const handleCreateUser = (newUserData) => {
        const newUser = {
            ...newUserData,
            id: Date.now(),
            createdAt: new Date().toISOString()
        };
        const updated = [...users, newUser];
        setUsers(updated);
        setFilteredUsers(updated);
        setIsCreating(false);
    };

    const handleUpdateUser = (updatedUser) => {
        const updated = users.map(user => 
            user.id === updatedUser.id ? updatedUser : user
        );
        setUsers(updated);
        setFilteredUsers(updated);
        setEditedUser(null);
    };

    const handleEdit = (user) => {
        setEditedUser(user);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const updated = users.filter(user => user.id !== id);
            setUsers(updated);
            setFilteredUsers(updated);
        }
    };

    const columns = [
        {
            key: "name",
            label: "Name",
            render: (item) => <span className={styles.userName}>{item.name}</span>,
        },
        {
            key: "actions",
            label: "Actions",
            render: (item) => (
                <div className={styles.actionButtons}>
                    <button onClick={() => handleEdit(item)} className={styles.editButton} title="Edit">
                        <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className={styles.deleteButton} title="Delete">
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className={styles.permissionsContainer}>
            {isCreating ? (
                <CreateUserForm 
                    onSave={handleCreateUser}
                    onCancel={() => setIsCreating(false)} 
                />
            ) : editedUser ? (
                <EditUserForm
                    userData={editedUser}
                    onSave={handleUpdateUser}
                    onCancel={() => setEditedUser(null)}
                />
            ) : (
                <>  
                    <div className={styles.header}>
                        <button className={styles.createButton} onClick={() => setIsCreating(true)}>
                            <Plus size={16} /> Create User
                        </button>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.controlsBar}>
                            <div className={styles.showEntries}>
                                <button className={styles.showLabel}>Show Entries</button>
                                <span className={styles.entriesSelect}>{users.length}</span>
                            </div>

                            <SearchBar
                                data={users}
                                setFilteredData={setFilteredUsers}
                                searchKeys={["name", "email", "phone"]}
                            />
                        </div>

                        <ReusableTable
                            data={displayedUsers}
                            columns={columns}
                            startIndex={(currentPage - 1) * showEntries}
                            emptyMessage="No matching users found"
                            showIndex={false}
                        />

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                            totalItems={filteredUsers.length}
                            displayedItems={displayedUsers.length}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Users;