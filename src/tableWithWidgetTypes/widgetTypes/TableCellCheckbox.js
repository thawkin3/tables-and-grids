import React from 'react';

export const TableCellCheckbox = ({ tableData }) => (
  <input
    type="checkbox"
    checked={tableData.value}
    aria-label={tableData['aria-label']}
  />
);
