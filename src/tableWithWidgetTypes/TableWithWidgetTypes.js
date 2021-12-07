import React from 'react';
import { TableCell } from './widgetTypes/TableCell';
import '../Table.css';

export const TableWithWidgetTypes = ({ tableData }) => {
  const tableHeaders = Object.keys(tableData[0]);

  return (
    <table aria-label="Table with various widget types like checkboxes, text, and links">
      <thead>
        <tr>
          {tableHeaders.map(tableHeader => (
            <th key={tableHeader}>{tableHeader}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map(tableRow => (
          <tr key={tableRow.id.value}>
            {Object.values(tableRow).map(tableCellData => (
              <TableCell
                key={`${tableCellData.widgetType}-${tableCellData.value}`}
                tableCellData={tableCellData}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
