import React from 'react';

export const TableCellLink = ({ tableCellData }) => (
  // TODO: Need a way to navigate to links while in View Mode
  <a href={tableCellData.href} tabIndex={-1}>
    {tableCellData.value}
  </a>
);
