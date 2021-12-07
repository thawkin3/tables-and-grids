import React from 'react';

export const TableCellCheckbox = ({ tableData }) => (
  <input
    type="checkbox"
    value={tableData.value}
    aria-label={tableData['aria-label']}
  />
);
