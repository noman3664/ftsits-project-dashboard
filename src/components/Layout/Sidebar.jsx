import React from 'react';
import logo from '../../assets/logo.png';
import styles from './Sidebar.module.css';
import Permissions from '../Dashboard/Roles';

function Sidebar({ active, setActive }) {
    const links = ['Dashboard', 'Roles', 'Permissions', 'Tasks', 'Projects', 'Task Report', 'Users'];

    return (
        <div className={styles.sidebar}>
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
