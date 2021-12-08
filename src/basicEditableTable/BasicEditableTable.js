import React, { useState } from 'react';
import { EditableTableCell } from './EditableTableCell';
import '../Table.css';

export const BasicEditableTable = ({ tableData }) => {
  const tableHeaders = Object.keys(tableData[0]);

  const [currentTableData, setCurrentTableData] = useState(tableData);
  const [currentEditingRow, setCurrentEditingRow] = useState(null);

  return (
    <table aria-label="Basic editable table">
      <thead>
        <tr>
          {tableHeaders.map(tableHeader => (
            <th key={tableHeader}>{tableHeader}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {currentTableData.map((tableRow, rowIndex) => (
          <tr key={tableRow.id}>
            {Object.values(tableRow).map((tableCellData, columnIndex) => (
              <EditableTableCell
                key={`${rowIndex}-${tableCellData}`}
                tableCellData={tableCellData}
                rowIndex={rowIndex}
                headerKey={Object.keys(tableRow)[columnIndex]}
                currentEditingRow={currentEditingRow}
                setCurrentEditingRow={setCurrentEditingRow}
                currentTableData={currentTableData}
                setCurrentTableData={setCurrentTableData}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
