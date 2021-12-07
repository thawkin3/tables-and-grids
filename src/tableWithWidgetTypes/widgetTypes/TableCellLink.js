import React from 'react';

export const TableCellLink = ({ tableData }) => (
  <a href={tableData.href}>{tableData.value}</a>
);
