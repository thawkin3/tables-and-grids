import React, { useEffect, useRef } from 'react';

export const TableCellCheckbox = ({
  tableCellData,
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
        checked={tableCellData.value}
        aria-label={tableCellData['aria-label']}
        tabIndex={-1}
        ref={tableCellRef}
      />
    </td>
  );
};
