import React, { useRef, useState } from 'react';
import { TableCell } from './widgetTypes/TableCell';
import '../Table.css';

export const TableGrid = ({ tableData }) => {
  const tableHeaders = Object.keys(tableData[0]);
  const tableRowCount = tableData.length;
  const tableColumnCount = tableHeaders.length;
  const lastRowIndex = tableRowCount - 1;
  const lastColumnIndex = tableColumnCount - 1;

  const [currentCellXCoordinate, setCurrentCellXCoordinate] = useState(null);
  const [currentCellYCoordinate, setCurrentCellYCoordinate] = useState(null);

  const tableGridRef = useRef(null);

  const handleGridFocus = e => {
    if (e.target === tableGridRef.current) {
      setCurrentCellXCoordinate(null);
      setCurrentCellYCoordinate(null);
    }
  };

  const handleGridKeyDown = e => {
    e.persist();
    const key = e.key;

    switch (key) {
      case 'ArrowUp':
        handleArrowUp(e);
        break;
      case 'ArrowDown':
        handleArrowDown(e);
        break;
      case 'ArrowLeft':
        handleArrowLeft(e);
        break;
      case 'ArrowRight':
        handleArrowRight(e);
        break;
      case 'Home':
        handleHome(e);
        break;
      case 'End':
        handleEnd(e);
        break;
      default:
      // do nothing
    }
  };

  const handleArrowUp = e => {
    e.preventDefault();

    if (areAnyCellsCurrentlyFocused()) {
      setCurrentCellYCoordinate(Math.max(currentCellYCoordinate - 1, 0));
    } else {
      handleArrowKeysForFirstFocusedCell();
    }
  };

  const handleArrowDown = e => {
    e.preventDefault();

    if (areAnyCellsCurrentlyFocused()) {
      setCurrentCellYCoordinate(
        Math.min(currentCellYCoordinate + 1, lastRowIndex)
      );
    } else {
      handleArrowKeysForFirstFocusedCell();
    }
  };

  const handleArrowLeft = e => {
    e.preventDefault();

    if (areAnyCellsCurrentlyFocused()) {
      setCurrentCellXCoordinate(Math.max(currentCellXCoordinate - 1, 0));
    } else {
      handleArrowKeysForFirstFocusedCell();
    }
  };

  const handleArrowRight = e => {
    e.preventDefault();

    if (areAnyCellsCurrentlyFocused()) {
      setCurrentCellXCoordinate(
        Math.min(currentCellXCoordinate + 1, lastColumnIndex)
      );
    } else {
      handleArrowKeysForFirstFocusedCell();
    }
  };

  const handleHome = e => {
    e.preventDefault();

    if (areAnyCellsCurrentlyFocused()) {
      setCurrentCellXCoordinate(0);

      if (e.ctrlKey) {
        setCurrentCellYCoordinate(0);
      }
    } else {
      handleArrowKeysForFirstFocusedCell();
    }
  };

  const handleEnd = e => {
    e.preventDefault();

    if (areAnyCellsCurrentlyFocused()) {
      setCurrentCellXCoordinate(lastColumnIndex);

      if (e.ctrlKey) {
        setCurrentCellYCoordinate(lastRowIndex);
      }
    } else {
      handleArrowKeysForFirstFocusedCell();
    }
  };

  const handleArrowKeysForFirstFocusedCell = () => {
    setCurrentCellXCoordinate(0);
    setCurrentCellYCoordinate(0);
  };

  const areAnyCellsCurrentlyFocused = () =>
    currentCellXCoordinate !== null && currentCellYCoordinate !== null;

  return (
    <table
      tabIndex="0"
      aria-label="Table grid. Navigate cells using the arrow keys."
      role="grid"
      ref={tableGridRef}
      onKeyDown={handleGridKeyDown}
      onFocus={handleGridFocus}
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
        {tableData.map((tableRow, rowIndex) => (
          <tr key={tableRow.id.value}>
            {Object.values(tableRow).map((tableCellData, columnIndex) => {
              const isCurrentFocusedCell =
                rowIndex === currentCellYCoordinate &&
                columnIndex === currentCellXCoordinate;

              const setIsCurrentFocusedCell = () => {
                setCurrentCellXCoordinate(columnIndex);
                setCurrentCellYCoordinate(rowIndex);
              };

              return (
                <TableCell
                  key={`${columnIndex}-${rowIndex}-${tableCellData.widgetType}-${tableCellData.value}`}
                  tableCellData={tableCellData}
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
