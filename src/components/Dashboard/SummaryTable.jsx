import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SummaryTable.module.css";

const SummaryTable = ({ title, bgColor }) => {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.header} ${bgColor}`}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search anything here..."
            className={styles.searchInput}
          />
          <FaSearch />
        </div>
      </div>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>User</th>
            <th className={styles.th}>Total</th>
            <th className={styles.th}>Open</th>
            <th className={styles.th}>Closed</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {[...Array(6)].map((_, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? styles.rowEven : styles.rowOdd}
            >
              <td className={styles.td}>Admin</td>
              <td className={styles.td}>0</td>
              <td className={styles.td}>0</td>
              <td className={styles.td}>0</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.footer}>
        <p className={styles.footerText}>Showing 1 to 1 entries</p>
        <div className={styles.pagination}>
          <button className={styles.pageBtnRed}>Previous</button>
          <button className={styles.pageBtnYellow}>12</button>
          <button className={styles.pageBtnRed}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default SummaryTable;
