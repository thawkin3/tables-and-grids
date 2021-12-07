import React, { useEffect, useRef } from 'react';

export const TableCellText = ({
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
    <td tabIndex={-1} ref={tableCellRef} onClick={setIsCurrentFocusedCell}>
      {tableData.value}
    </td>
  );
};
