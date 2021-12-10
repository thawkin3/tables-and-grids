import React, { useEffect, useRef, useState } from 'react';
import { EditableTableCell } from './widgetTypes/EditableTableCell';
import '../Table.css';

export const EditableTableGrid = ({ tableData }) => {
  const tableHeaders = Object.keys(tableData[0]);
  const tableRowCount = tableData.length;
  const tableColumnCount = tableHeaders.length;
  const lastRowIndex = tableRowCount - 1;
  const lastColumnIndex = tableColumnCount - 1;

  const [currentCellXCoordinate, setCurrentCellXCoordinate] = useState(null);
  const [currentCellYCoordinate, setCurrentCellYCoordinate] = useState(null);

  const [currentTableData, setCurrentTableData] = useState(tableData);
  const [currentEditingRow, setCurrentEditingRow] = useState(null);
  const [currentEditingColumn, setCurrentEditingColumn] = useState(null);

  const tableGridRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = e => {
      const isClickOutsideTable =
        tableGridRef.current && !tableGridRef.current.contains(e.target);
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

  const handleGridFocus = e => {
    if (e.target === tableGridRef.current) {
      setCurrentCellXCoordinate(null);
      setCurrentCellYCoordinate(null);
    }
  };

  const handleGridKeyDown = e => {
    e.persist();
    const key = e.key;
    const isInEditMode = currentEditingRow !== null;

    if (isInEditMode) {
      switch (key) {
        case 'Escape':
        case 'Esc':
          handleEscape();
          break;
        default:
        // do nothing
      }
    } else {
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

  const handleEscape = () => {
    setCurrentEditingRow(null);
    setCurrentEditingColumn(null);
  };

  return (
    <table
      tabIndex="0"
      aria-label="Editable table grid with various widget types like checkboxes, text, and links. Navigate cells using the arrow keys."
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
        {currentTableData.map((tableRow, rowIndex) => (
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
                <EditableTableCell
                  key={`${columnIndex}-${rowIndex}-${tableCellData.widgetType}-${tableCellData.value}`}
                  tableCellData={tableCellData}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  numberOfRows={tableRowCount}
                  numberOfColumns={tableColumnCount}
                  headerKey={Object.keys(tableRow)[columnIndex]}
                  currentEditingRow={currentEditingRow}
                  setCurrentEditingRow={setCurrentEditingRow}
                  currentEditingColumn={currentEditingColumn}
                  setCurrentEditingColumn={setCurrentEditingColumn}
                  currentTableData={currentTableData}
                  setCurrentTableData={setCurrentTableData}
                  isCurrentFocusedCell={isCurrentFocusedCell}
                  setIsCurrentFocusedCell={setIsCurrentFocusedCell}
                  setCurrentCellXCoordinate={setCurrentCellXCoordinate}
                  setCurrentCellYCoordinate={setCurrentCellYCoordinate}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
