import React from 'react';
import { TableCellCheckbox } from './TableCellCheckbox';
import { TableCellLink } from './TableCellLink';
import { TableCellText } from './TableCellText';

export const TableCell = ({ tableData }) => {
  const getTableCellWidget = widgetType => {
    switch (widgetType) {
      case 'checkbox':
        return <TableCellCheckbox tableData={tableData} />;
      case 'link':
        return <TableCellLink tableData={tableData} />;
      case 'text':
      default:
        return <TableCellText tableData={tableData} />;
    }
  };

  return <td>{getTableCellWidget(tableData.widgetType)}</td>;
};
