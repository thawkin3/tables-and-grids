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

  const handleTableCellKeyDown = e => {
    if (e.key === 'Enter') {
      enterEditMode();
    }
  };

  const enterEditMode = e => {
    setCurrentEditingRow(rowIndex);
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
        }
        break;
      case 'Enter':
        updateCellData();
        // TODO: Send focus to the next cell in the column
        // setCurrentEditingRow(rowIndex + 1);
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
  };

  const handleTableCellInputChange = e => {
    setTableCellInputValue(e.target.value);
  };

  const handleTableCellFocus = e => {
    const wasPreviouslyEditingRowDirectlyAboveOrBelow =
      currentEditingRow !== null &&
      Math.abs(currentEditingRow - rowIndex) === 1;
    if (wasPreviouslyEditingRowDirectlyAboveOrBelow) {
      setCurrentEditingRow(rowIndex);
      setNeedToSetFocusToTableCellInput(true);
    }
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
    <td
      tabIndex={0}
      onKeyPress={handleTableCellKeyDown}
      onDoubleClick={enterEditMode}
      onFocus={handleTableCellFocus}
      ref={tableCellRef}
      role="button"
      aria-label={`Edit - ${tableCellData}`}
    >
      {tableCellData}
    </td>
  );
};
