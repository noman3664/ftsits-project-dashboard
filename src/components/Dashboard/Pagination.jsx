import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
  totalItems,
  displayedItems,
}) {
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const startItem =
    totalItems === 0 ? 0 : (currentPage - 1) * displayedItems + 1;
  const endItem =
    totalItems === 0
      ? 0
      : Math.min(currentPage * displayedItems, totalItems);

  return (
    <div className={styles.footer}>
      <p className={styles.footerText}>
        {totalItems === 0
          ? "No entries found"
          : `Showing ${startItem} to ${endItem} of ${totalItems} Entries`}
      </p>

      <div className={styles.pagination}>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={styles.pageBtnRed}
        >
          Previous
        </button>

        <button className={`${styles.pageBtnYellow} ${styles.activePage}`}>
          {currentPage}
        </button>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={styles.pageBtnRed}
        >
          Next
        </button>
      </div>
    </div>
  );
}
