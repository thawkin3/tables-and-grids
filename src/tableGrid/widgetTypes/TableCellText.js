import React, { useEffect, useRef } from 'react';

export const TableCellText = ({
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
    <td tabIndex={-1} ref={tableCellRef} onClick={setIsCurrentFocusedCell}>
      {tableCellData.value}
    </td>
  );
};
