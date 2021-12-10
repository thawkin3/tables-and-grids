import React, { useEffect, useRef, useState } from 'react';
import { EditableTableCell } from './widgetTypes/EditableTableCell';
import '../Table.css';

export const EditableTableWithWidgetTypes = ({ tableData }) => {
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

  const handleTableKeydown = e => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      setCurrentEditingRow(null);
      setCurrentEditingColumn(null);
    }
  };

  return (
    <table
      aria-label="Editable table with various widget types like checkboxes, text, and links"
      ref={tableRef}
      onKeyDown={handleTableKeydown}
    >
      <thead>
        <tr>
          {tableHeaders.map(tableHeader => (
            <th key={tableHeader} scope="col">
              {tableHeader}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {currentTableData.map((tableRow, rowIndex) => (
          <tr key={tableRow.id.value}>
            {Object.values(tableRow).map((tableCellData, columnIndex) => (
              <EditableTableCell
                key={`${columnIndex}-${rowIndex}-${tableCellData.widgetType}-${tableCellData.value}`}
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
