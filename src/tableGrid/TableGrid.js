import React, { useState } from 'react';
import { TableCell } from './widgetTypes/TableCell';
import '../Table.css';

export const TableGrid = ({ tableData }) => {
  const tableHeaders = Object.keys(tableData[0]);
  const tableRowCount = tableData.length;
  const tableColumnCount = tableHeaders.length;
  const lastRowIndex = tableRowCount - 1;
  const lastColumnIndex = tableColumnCount - 1;

  const [currentCellXCoordinate, setCurrentCellXCoordinate] = useState(0);
  const [currentCellYCoordinate, setCurrentCellYCoordinate] = useState(0);

  const handleGridKeyDown = e => {
    const key = e.key;

    switch (key) {
      case 'ArrowUp':
        e.preventDefault();
        setCurrentCellYCoordinate(Math.max(currentCellYCoordinate - 1, 0));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setCurrentCellYCoordinate(
          Math.min(currentCellYCoordinate + 1, lastRowIndex)
        );
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setCurrentCellXCoordinate(Math.max(currentCellXCoordinate - 1, 0));
        break;
      case 'ArrowRight':
        e.preventDefault();
        setCurrentCellXCoordinate(
          Math.min(currentCellXCoordinate + 1, lastColumnIndex)
        );
        break;
      default:
      // do nothing
    }
  };

  return (
    <table
      tabIndex="0"
      aria-label="Table grid. Navigate cells using the arrow keys."
      role="grid"
      onKeyDown={handleGridKeyDown}
    >
      <thead>
        <tr>
          {tableHeaders.map(tableHeader => (
            <th key={tableHeader}>{tableHeader}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((tableRow, rowIndex) => (
          <tr key={tableRow.id.value}>
            {Object.values(tableRow).map((tableData, columnIndex) => {
              const isCurrentFocusedCell =
                rowIndex === currentCellYCoordinate &&
                columnIndex === currentCellXCoordinate;

              const setIsCurrentFocusedCell = () => {
                setCurrentCellXCoordinate(columnIndex);
                setCurrentCellYCoordinate(rowIndex);
              };

              return (
                <TableCell
                  key={`${columnIndex}-${rowIndex}-${tableData.widgetType}-${tableData.value}`}
                  tableData={tableData}
                  isCurrentFocusedCell={isCurrentFocusedCell}
                  setIsCurrentFocusedCell={setIsCurrentFocusedCell}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
