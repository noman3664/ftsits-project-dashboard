import { FaSearch, FaBars, FaChevronDown, FaUserEdit, FaPlusCircle, FaTasks, FaClipboardList, FaClock, FaSignOutAlt, FaChartBar } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import SearchBar from "../Dashboard/SearchBar";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar({ toggleSidebar }) {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", role: "", image: "" });


  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    //  Update user in Navbar when profile changes in another tab or page
    const handleStorageChange = (event) => {
      if (event.key === "user") {
        const updatedUser = JSON.parse(event.newValue);
        setUser(updatedUser || { name: "", role: "", image: "" });
      }


      const handleUserUpdate = (event) => {
        setUser(event.detail);
      };

      window.addEventListener('userUpdated', handleUserUpdate);
      return () => window.removeEventListener('userUpdated', handleUserUpdate);
    };
    window.addEventListener("storage", handleStorageChange);

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleMenuItemClick = (action) => {
    setActiveItem(action);
    setIsDropdownOpen(false);

    switch (action) {
      case "Edit Profile":
        navigate("edit-profile");
        location.reload();
        break;
      case "Add Project":
        navigate("projects");
        break;
      case "New Tasks":
        navigate("tasks");
        break;
      case "Daily Log Report":
        navigate("task-report");
        break;
      case "Daily Logs":
        navigate("/logs");
        break;
      default:
        break;
    }
  };


  const menuItems = [
    { label: "Edit Profile", icon: <FaUserEdit /> },
    { label: "Add Project", icon: <FaPlusCircle /> },
    { label: "New Tasks", icon: <FaTasks /> },
    { label: "Daily Log Report", icon: <FaClipboardList /> },
    { label: "Daily Logs", icon: <FaChartBar /> },
    { label: "Clock In", icon: <FaClock /> },
  ];
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    location.reload();
  };


  return (
    <div className={styles.navbar}>
      <button className={`${styles.menuBtn}`} onClick={toggleSidebar}>
        <FaBars />
      </button>
      <h1 className={styles.title}>Dashboard</h1>

      <SearchBar />
      {/* <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search anything here..."
          className={styles.searchInput}
        />
        <FaSearch className={styles.searchIcon} />
      </div> */}

      <div
        className={styles.profileSection}
        ref={dropdownRef}
      >

        <img
          src={user.image || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
          alt="Profile"
          className={styles.profileImage}
        />
        <div className={styles.profileInfo}>
          <p className={styles.profileName}>{user.name || "Guest User"}</p>
          <span className={styles.badge}>{user.role || "User"}</span>
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
              className={`${styles.dropdownItem} ${styles.logout}`} onClick={handleLogout} >
              <span className={styles.menuIcon}><FaSignOutAlt /></span>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}