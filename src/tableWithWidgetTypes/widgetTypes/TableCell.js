import React, { useEffect, useRef } from 'react';
import { TableCellCheckbox } from './TableCellCheckbox';
import { TableCellLink } from './TableCellLink';
import { TableCellText } from './TableCellText';

export const TableCell = ({
  tableData,
  isCurrentFocusedCell,
  ...restProps
}) => {
  const tableCellRef = useRef(null);

  useEffect(() => {
    if (isCurrentFocusedCell) {
      tableCellRef.current?.focus();
    }
  }, [isCurrentFocusedCell]);

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

  return (
    <td ref={tableCellRef} {...restProps}>
      {getTableCellWidget(tableData.widgetType)}
    </td>
  );
};
