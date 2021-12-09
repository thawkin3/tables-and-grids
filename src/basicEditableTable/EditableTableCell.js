import React, { useEffect, useRef, useState } from 'react';
import './EditableTableCell.css';

export const EditableTableCell = ({
  rowIndex,
  columnIndex,
  numberOfRows,
  numberOfColumns,
  headerKey,
  currentEditingRow,
  setCurrentEditingRow,
  currentEditingColumn,
  setCurrentEditingColumn,
  currentTableData,
  setCurrentTableData,
  tableCellData,
}) => {
  const tableCellRef = useRef(null);
  const tableCellInputRef = useRef(null);

  const [tableCellInputValue, setTableCellInputValue] = useState(tableCellData);
  const [needToSetFocusToTableCell, setNeedToSetFocusToTableCell] =
    useState(false);
  const [needToSetFocusToTableCellInput, setNeedToSetFocusToTableCellInput] =
    useState(false);

  useEffect(() => {
    if (needToSetFocusToTableCell) {
      tableCellRef.current?.focus();
      setNeedToSetFocusToTableCell(false);
    }
  }, [needToSetFocusToTableCell]);

  useEffect(() => {
    if (needToSetFocusToTableCellInput) {
      tableCellInputRef.current?.focus();
      setNeedToSetFocusToTableCellInput(false);
    }
  }, [needToSetFocusToTableCellInput]);

  useEffect(() => {
    if (
      currentEditingRow === rowIndex &&
      currentEditingColumn === columnIndex
    ) {
      tableCellInputRef.current?.focus();
    }
  }, [currentEditingRow, currentEditingColumn, rowIndex, columnIndex]);

  const handleTableCellKeyDown = e => {
    if (e.key === 'Enter') {
      enterEditMode();
    }
  };

  const enterEditMode = e => {
    setCurrentEditingRow(rowIndex);
    setCurrentEditingColumn(columnIndex);
    setNeedToSetFocusToTableCellInput(true);
  };

  const handleTableCellInputKeyDown = e => {
    const key = e.key;

    switch (key) {
      case 'Tab':
        updateCellData();

        const focusHasLeftTable =
          isCellBottomRightInTable() || (isCellTopLeftInTable() && e.shiftKey);

        if (focusHasLeftTable) {
          leaveEditMode();
        } else {
          e.preventDefault();
          if (e.shiftKey) {
            const previousColumn = columnIndex - 1;
            if (previousColumn >= 0) {
              setCurrentEditingColumn(previousColumn);
            } else {
              setCurrentEditingColumn(numberOfColumns - 1);
              setCurrentEditingRow(currentEditingRow - 1);
            }
          } else {
            const nextColumn = columnIndex + 1;

            if (nextColumn <= numberOfColumns - 1) {
              setCurrentEditingColumn(nextColumn);
            } else {
              setCurrentEditingColumn(0);
              setCurrentEditingRow(currentEditingRow + 1);
            }
          }
        }

        break;
      case 'Enter':
        updateCellData();

        if (e.shiftKey) {
          const previousRow = rowIndex - 1;
          setCurrentEditingRow(previousRow >= 0 ? previousRow : null);
        } else {
          const nextRow = rowIndex + 1;
          setCurrentEditingRow(nextRow <= numberOfRows ? nextRow : null);
        }
        break;
      case 'Escape':
      case 'Esc':
        discardCellDataChanges();
        leaveEditMode();
        setNeedToSetFocusToTableCell(true);
        break;
      default:
      // do nothing
    }
  };

  const isCellBottomRightInTable = () =>
    rowIndex === numberOfRows - 1 && columnIndex === numberOfColumns - 1;

  const isCellTopLeftInTable = () => rowIndex === 0 && columnIndex === 0;

  const updateCellData = () => {
    const updatedTableData = [...currentTableData];
    updatedTableData[rowIndex][headerKey] = tableCellInputValue;
    setCurrentTableData(updatedTableData);
  };

  const discardCellDataChanges = () => {
    setTableCellInputValue(tableCellData);
  };

  const leaveEditMode = () => {
    setCurrentEditingRow(null);
    setCurrentEditingColumn(null);
  };

  const handleTableCellInputChange = e => {
    setTableCellInputValue(e.target.value);
  };

  return currentEditingRow === rowIndex ? (
    <td>
      <input
        type="text"
        value={tableCellInputValue}
        onKeyDown={handleTableCellInputKeyDown}
        onChange={handleTableCellInputChange}
        ref={tableCellInputRef}
        className="textInput"
      />
    </td>
  ) : (
    <td className="tableCellThatContainsViewModeButton">
      <button
        className="tableCellViewModeButton"
        onKeyPress={handleTableCellKeyDown}
        onDoubleClick={enterEditMode}
        ref={tableCellRef}
        aria-label={`${tableCellData} - Press Enter to edit`}
      >
        {tableCellData}
      </button>
    </td>
  );
};
