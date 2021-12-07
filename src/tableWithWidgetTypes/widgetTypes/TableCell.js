import React from 'react';
import { TableCellCheckbox } from './TableCellCheckbox';
import { TableCellLink } from './TableCellLink';
import { TableCellText } from './TableCellText';

export const TableCell = ({ tableCellData }) => {
  const getTableCellWidget = widgetType => {
    switch (widgetType) {
      case 'checkbox':
        return <TableCellCheckbox tableCellData={tableCellData} />;
      case 'link':
        return <TableCellLink tableCellData={tableCellData} />;
      case 'text':
      default:
        return <TableCellText tableCellData={tableCellData} />;
    }
  };

  return <td>{getTableCellWidget(tableCellData.widgetType)}</td>;
};
