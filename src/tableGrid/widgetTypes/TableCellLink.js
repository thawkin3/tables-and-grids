import React, { useEffect, useRef } from 'react';

export const TableCellLink = ({ tableData, isCurrentFocusedCell }) => {
  const tableCellRef = useRef(null);

  useEffect(() => {
    if (isCurrentFocusedCell) {
      tableCellRef.current?.focus();
    }
  }, [isCurrentFocusedCell]);

  return (
    <td>
      <a href={tableData.href} tabIndex={-1} ref={tableCellRef}>
        {tableData.value}
      </a>
    </td>
  );
};
