import React from 'react';
import '../Table.css';

export const BasicTable = ({ tableData }) => {
  const tableHeaders = Object.keys(tableData[0]);

  return (
    <table aria-label="Basic table">
      <thead>
        <tr>
          {tableHeaders.map(tableHeader => (
            <th key={tableHeader}>{tableHeader}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map(tableRow => (
          <tr key={tableRow.id}>
            {Object.values(tableRow).map(tableCellData => (
              <td key={tableCellData}>{tableCellData}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
