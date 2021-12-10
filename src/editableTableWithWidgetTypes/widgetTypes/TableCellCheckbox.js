import React from 'react';

export const TableCellCheckbox = ({ tableCellData }) => (
  <input type="checkbox" aria-label={tableCellData['aria-label']} />
);
