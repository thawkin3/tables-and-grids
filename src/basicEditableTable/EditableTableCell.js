import React, { useEffect, useRef, useState } from 'react';

export const EditableTableCell = ({
  rowIndex,
  headerKey,
  columnIndex,
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

  const enterEditMode = e => {
    if (e.key === 'Enter') {
      setCurrentEditingRow(rowIndex);
      setNeedToSetFocusToTableCellInput(true);
    }
  };

  const handleTableCellInputKeyDown = e => {
    const key = e.key;

    switch (key) {
      case 'Tab':
        updateCellData();
        break;
      case 'Enter':
        updateCellData();
        leaveEditMode();
        break;
      case 'Escape':
      case 'Esc':
        leaveEditMode();
        break;
      default:
      // do nothing
    }
  };

  const updateCellData = () => {
    const updatedTableData = [...currentTableData];
    updatedTableData[rowIndex][headerKey] = tableCellInputValue;
    setCurrentTableData(updatedTableData);
  };

  const leaveEditMode = () => {
    setCurrentEditingRow(null);
    setNeedToSetFocusToTableCell(true);
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
      />
    </td>
  ) : (
    <td tabIndex={0} onKeyPress={enterEditMode} ref={tableCellRef}>
      {tableCellData}
    </td>
  );
};
