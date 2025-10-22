import React, { useEffect, useRef } from 'react';
import logo from '../../assets/logo.png';
import styles from './Sidebar.module.css';
import {
    LayoutDashboard,
    Shield,
    LockKeyhole,
    ClipboardList,
    FolderKanban,
    FileBarChart,
    Users,
} from "lucide-react";

function Sidebar({ active, setActive, isOpen, toggleSidebar }) {
    const links = ['Dashboard', 'Roles', 'Permissions', 'Tasks', 'Projects', 'Task Report', 'Users'];
    const sidebarRef = useRef(null);

    // Close sidebar when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                toggleSidebar(); // close the sidebar
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, toggleSidebar]);

    return (
        <div
            ref={sidebarRef}
            className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : styles.sidebarClosed}`}
        >
            <button onClick={toggleSidebar} className={styles.closeBtn}>
                ✕
            </button>

            <div className={styles.sidebarHeader}>
                <div className={styles.logoWrapper}>
                    <img src={logo} alt="Logo" className={styles.logo} />
                </div>
            </div>

            <nav className={styles.nav}>
                {links.map((item) => (
                    <a
                        key={item}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setActive(item);
                            toggleSidebar(); // optional: also close when a link is clicked
                        }}
                        className={`${styles.link} ${active === item ? styles.linkActive : ''}`}
                    >
                        {item}
                    </a>
                ))}
            </nav>
        </div>
    );
}

export default Sidebar;
