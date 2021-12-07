import React from 'react';
import { TableCellCheckbox } from './TableCellCheckbox';
import { TableCellLink } from './TableCellLink';
import { TableCellText } from './TableCellText';

export const TableCell = ({
  tableCellData,
  isCurrentFocusedCell,
  setIsCurrentFocusedCell,
}) => {
  const getTableCellWidget = widgetType => {
    switch (widgetType) {
      case 'checkbox':
        return (
          <TableCellCheckbox
            tableCellData={tableCellData}
            isCurrentFocusedCell={isCurrentFocusedCell}
            setIsCurrentFocusedCell={setIsCurrentFocusedCell}
          />
        );
      case 'link':
        return (
          <TableCellLink
            tableCellData={tableCellData}
            isCurrentFocusedCell={isCurrentFocusedCell}
            setIsCurrentFocusedCell={setIsCurrentFocusedCell}
          />
        );
      case 'text':
      default:
        return (
          <TableCellText
            tableCellData={tableCellData}
            isCurrentFocusedCell={isCurrentFocusedCell}
            setIsCurrentFocusedCell={setIsCurrentFocusedCell}
          />
        );
    }
  };

  return getTableCellWidget(tableCellData.widgetType);
};
