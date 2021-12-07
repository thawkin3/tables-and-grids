import React, { useEffect, useRef } from 'react';

export const TableCellLink = ({
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
      <a href={tableCellData.href} tabIndex={-1} ref={tableCellRef}>
        {tableCellData.value}
      </a>
    </td>
  );
};
