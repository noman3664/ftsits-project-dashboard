import { FaSearch, FaChevronDown, FaUserEdit, FaPlusCircle, FaTasks, FaClipboardList, FaClock, FaSignOutAlt, FaChartBar } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (action) => {
    console.log(`Clicked: ${action}`);
    // Add your navigation logic here
    setActiveItem(action);
    setIsDropdownOpen(false);
  };
  const menuItems = [
    { label: "Edit Profile", icon: <FaUserEdit /> },
    { label: "Add Project", icon: <FaPlusCircle /> },
    { label: "New Tasks", icon: <FaTasks /> },
    { label: "Daily Log Report", icon: <FaClipboardList /> },
    { label: "Daily Logs", icon: <FaChartBar /> },
    { label: "Clock In", icon: <FaClock /> },
  ];
  return (
    <div className={styles.navbar}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search anything here..."
          className={styles.searchInput}
        />
        <FaSearch className={styles.searchIcon} />
      </div>

      <div 
        className={styles.profileSection} 
        ref={dropdownRef}
      >
        <img
          src="/profile.jpg"
          alt="Profile"
          className={styles.profileImage}
        />
        <div className={styles.profileInfo}>
          <p className={styles.profileName}>Gustavo Xavier</p>
          <span className={styles.badge}>Admin</span>
        </div>
        <FaChevronDown 
          className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.rotate : ""}`}
          onClick={toggleDropdown}
        />

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            {menuItems.map((item) => (
              <div
                key={item.label}
                className={`${styles.dropdownItem} ${activeItem === item.label ? styles.activeItem : ""}`}
                onClick={() => handleMenuItemClick(item.label)}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                {item.label}
              </div>
            ))}
            <hr className={styles.divider} />
            <div 
              className={`${styles.dropdownItem} ${styles.logout}`} >
              <span className={styles.menuIcon}><FaSignOutAlt /></span>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}