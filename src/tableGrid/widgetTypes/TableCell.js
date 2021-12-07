import React from 'react';
import { TableCellCheckbox } from './TableCellCheckbox';
import { TableCellLink } from './TableCellLink';
import { TableCellText } from './TableCellText';

export const TableCell = ({ tableData, isCurrentFocusedCell }) => {
  const getTableCellWidget = widgetType => {
    switch (widgetType) {
      case 'checkbox':
        return (
          <TableCellCheckbox
            tableData={tableData}
            isCurrentFocusedCell={isCurrentFocusedCell}
          />
        );
      case 'link':
        return (
          <TableCellLink
            tableData={tableData}
            isCurrentFocusedCell={isCurrentFocusedCell}
          />
        );
      case 'text':
      default:
        return (
          <TableCellText
            tableData={tableData}
            isCurrentFocusedCell={isCurrentFocusedCell}
          />
        );
    }
  };

  return getTableCellWidget(tableData.widgetType);
};
