import React from "react";
import {
  FaClipboardList,
  FaSpinner,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import styles from "./StatsCards.module.css";

const StatsCards = () => {
  const stats = [
    {
      title: "Open",
      value: "01k",
      icon: <FaClipboardList className={styles.iconPurple} />,
      bg: styles.bgPurple,
      barColor: styles.barPurple,
    },
    {
      title: "In Progress",
      value: "01k",
      icon: <FaSpinner className={styles.iconGreen} />,
      bg: styles.bgGreen,
      barColor: styles.barGreen,
    },
    {
      title: "Over Due",
      value: "0",
      icon: <FaExclamationCircle className={styles.iconRed} />,
      bg: styles.bgRed,
      barColor: styles.barRed,
    },
    {
      title: "Closed Tasks",
      value: "0",
      icon: <FaCheckCircle className={styles.iconBlue} />,
      bg: styles.bgBlue,
      barColor: styles.barBlue,
    },
  ];

  return (
    <div className={styles.statsContainer}>
      {stats.map((item, index) => (
        <div key={index} className={`${styles.card} ${item.bg}`}>
          <div className={styles.cardHeader}>
            {item.icon}
            <span className={styles.cardTitle}>{item.title}</span>
          </div>

          <h2 className={styles.cardValue}>{item.value}</h2>

          <div className={styles.progressContainer}>
            <div className={`${styles.progressBar} ${item.barColor}`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
