import React from 'react';
import { TableCell } from './TableCell';
import '../Table.css';

export const TableWithWidgetTypes = ({ tableData }) => {
  const tableHeaders = Object.keys(tableData[0]);
  console.log('tableHeaders', tableHeaders);

  return (
    <table>
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
