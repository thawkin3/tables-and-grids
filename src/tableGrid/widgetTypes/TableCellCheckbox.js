import React, { useEffect, useRef } from 'react';

export const TableCellCheckbox = ({
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
      <input
        type="checkbox"
        value={tableData.value}
        aria-label={tableData['aria-label']}
        tabIndex={-1}
        ref={tableCellRef}
      />
    </td>
  );
};
