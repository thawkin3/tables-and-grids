import React from 'react';
import { TableCell } from '../widgetTypes/TableCell';
import '../Table.css';

export const TableGrid = ({ tableData }) => {
  const tableHeaders = Object.keys(tableData[0]);

  return (
    <table
      tabIndex="0"
      aria-label="Table grid. Navigate cells using the arrow keys."
    >
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
            {Object.values(tableRow).map(tableData => (
              <TableCell
                key={`${tableData.widgetType}-${tableData.value}`}
                tableData={tableData}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
