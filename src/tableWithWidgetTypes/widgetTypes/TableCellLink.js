import React from 'react';

export const TableCellLink = ({ tableCellData }) => (
  <a href={tableCellData.href}>{tableCellData.value}</a>
);
