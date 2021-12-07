import React from 'react';

export const TableCellCheckbox = ({ tableCellData }) => (
  <input
    type="checkbox"
    checked={tableCellData.value}
    aria-label={tableCellData['aria-label']}
  />
);
