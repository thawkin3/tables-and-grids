import React, { useEffect, useRef } from 'react';

export const TableCellText = ({ tableData, isCurrentFocusedCell }) => {
  const tableCellRef = useRef(null);

  useEffect(() => {
    if (isCurrentFocusedCell) {
      tableCellRef.current?.focus();
    }
  }, [isCurrentFocusedCell]);

  return (
    <td tabIndex={-1} ref={tableCellRef}>
      {tableData.value}
    </td>
  );
};
