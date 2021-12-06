import React from 'react';
import '../Table.css';

export const BasicTable = ({ tableData }) => {
  const tableHeaders = Object.keys(tableData[0]);

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
          <tr key={tableRow.id}>
            {Object.values(tableRow).map(tableData => (
              <td key={tableData}>{tableData}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
