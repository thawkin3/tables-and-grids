import React, { useEffect, useRef } from 'react';

export const TableCellLink = ({
  tableData,
  isCurrentFocusedCell,
  setIsCurrentFocusedCell,
}) => {
  const tableCellRef = useRef(null);

  useEffect(() => {
    if (isCurrentFocusedCell) {
      tableCellRef.current?.focus();
    }
  }, [isCurrentFocusedCell]);

  return (
    <td onClick={setIsCurrentFocusedCell}>
      <a href={tableData.href} tabIndex={-1} ref={tableCellRef}>
        {tableData.value}
      </a>
    </td>
  );
};
