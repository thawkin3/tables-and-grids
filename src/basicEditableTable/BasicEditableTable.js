import React, { useEffect, useRef, useState } from 'react';
import { EditableTableCell } from './EditableTableCell';
import '../Table.css';

export const BasicEditableTable = ({ tableData }) => {
  const tableHeaders = Object.keys(tableData[0]);
  const numberOfColumns = tableHeaders.length;
  const numberOfRows = tableData.length;

  const [currentTableData, setCurrentTableData] = useState(tableData);
  const [currentEditingRow, setCurrentEditingRow] = useState(null);
  const [currentEditingColumn, setCurrentEditingColumn] = useState(null);

  const tableRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = e => {
      const isClickOutsideTable =
        tableRef.current && !tableRef.current.contains(e.target);
      const isInEditMode = currentEditingRow !== null;

      if (isClickOutsideTable && isInEditMode) {
        setCurrentEditingRow(null);
        setCurrentEditingColumn(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [currentEditingRow]);

  return (
    <table aria-label="Basic editable table" ref={tableRef}>
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
                columnIndex={columnIndex}
                numberOfRows={numberOfRows}
                numberOfColumns={numberOfColumns}
                headerKey={Object.keys(tableRow)[columnIndex]}
                currentEditingRow={currentEditingRow}
                setCurrentEditingRow={setCurrentEditingRow}
                currentEditingColumn={currentEditingColumn}
                setCurrentEditingColumn={setCurrentEditingColumn}
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
