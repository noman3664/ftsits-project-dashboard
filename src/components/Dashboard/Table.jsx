// Table.jsx
import React, { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import styles from "./Table.module.css";

const Table = ({
  title,
  bgColor,
  data,
  columns,
  searchKeys = [],
  itemsPerPage = 5,
  showSearch = true,
  showPagination = true,
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  const displayedData = useMemo(
    () => filteredData.slice(startIndex, startIndex + itemsPerPage),
    [filteredData, startIndex, itemsPerPage]
  );

  // Reset to first page when data changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={`${styles.header} ${bgColor}`}>
        <h2 className={styles.title}>{title}</h2>
        {showSearch && searchKeys.length > 0 && (
          <SearchBar
            data={data}
            setFilteredData={setFilteredData}
            searchKeys={searchKeys}
          />
        )}
      </div>

      {/* Table */}
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key} 
                className={column.className || styles.th}
                style={column.style}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedData.length > 0 ? (
            displayedData.map((row, index) => (
              <tr 
                key={row.id || index} 
                className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
              >
                {columns.map((column) => {
                  const cellContent = column.render 
                    ? column.render(row, startIndex + index) 
                    : row[column.key];
                  
                  return (
                    <td 
                      key={column.key}
                      className={`${styles.td} ${column.cellClassName || ''}`}
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className={styles.noData}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          totalItems={filteredData.length}
          displayedItems={displayedData.length}
        />
      )}
    </div>
  );
};

export default Table;