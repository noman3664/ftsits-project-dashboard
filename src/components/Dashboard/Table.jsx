import React from "react";
import styles from "./table.module.css";

const ReusableTable = ({
    data = [],
    columns = [],
    startIndex = 0,
    onAction = null,
    actionLabel = "View",
    emptyMessage = "No data found",
    showIndex = true,
}) => {
    const renderCellContent = (item, column) => {
        if (column.render) return column.render(item);
        return item[column.key];
    };

    return (
        <table className={styles.table}>
            <thead className={styles.thead}>
                <tr>
                    {showIndex && <th>#</th>} {/*  Only show if enabled */}
                    {columns.map((col) => (
                        <th
                            key={col.key}
                            className={`${styles.th} ${col.headerClassName || ""}`}
                        >
                            {col.label}
                        </th>

                    ))}
                    {onAction && <th>Action</th>}
                </tr>
            </thead>

            <tbody>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <tr key={item.id || index} className={styles.row}>
                            {showIndex && <td>{startIndex + index + 1}</td>} {/*  Conditional index */}
                            {columns.map((col) => (
                                <td
                                    key={col.key}
                                    className={`${styles.td} ${col.className ? col.className(item) : ""}`}
                                >
                                    {renderCellContent(item, col)}
                                </td>

                            ))}
                            {onAction && (
                                <td>
                                    <button
                                        className={styles.viewBtn}
                                        onClick={() => onAction(item)}
                                    >
                                        {actionLabel}
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={
                                columns.length +
                                (onAction ? 1 : 0) +
                                (showIndex ? 1 : 0) /*  adjusted colspan */
                            }
                            className={styles.noData}
                        >
                            {emptyMessage}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default ReusableTable;
