import React, { useEffect, useRef, useState } from 'react';
import { TableCellCheckbox } from './TableCellCheckbox';
import { TableCellLink } from './TableCellLink';
import { TableCellText } from './TableCellText';
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
  isCurrentFocusedCell,
  setIsCurrentFocusedCell,
  setCurrentCellXCoordinate,
  setCurrentCellYCoordinate,
}) => {
  const tableCellRef = useRef(null);
  const tableCellInputRef = useRef(null);

  const [tableCellInputValue, setTableCellInputValue] = useState(
    tableCellData.value
  );
  const [needToSetFocusToTableCell, setNeedToSetFocusToTableCell] =
    useState(false);
  const [needToSetFocusToTableCellInput, setNeedToSetFocusToTableCellInput] =
    useState(false);

  useEffect(() => {
    if (isCurrentFocusedCell) {
      tableCellRef.current?.focus();
    }
  }, [isCurrentFocusedCell]);

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

  const getTableCellWidget = widgetType => {
    switch (widgetType) {
      case 'checkbox':
        const checkboxProps =
          currentEditingRow === rowIndex
            ? {
                onKeyDown: handleTableCellInputKeyDown,
              }
            : {
                tabIndex: -1,
              };
        return (
          <TableCellCheckbox
            tableCellData={tableCellData}
            {...checkboxProps}
            ref={
              currentEditingRow === rowIndex ? tableCellInputRef : tableCellRef
            }
          />
        );
      case 'link':
        return <TableCellLink tableCellData={tableCellData} />;
      case 'text':
      default:
        return <TableCellText tableCellData={tableCellData} />;
    }
  };

  const shouldTableCellHaveTabStopBasedOnWidget = widgetType => {
    const widgetsWithNoTableCellTabStop = ['checkbox'];

    return !widgetsWithNoTableCellTabStop.includes(widgetType);
  };

  const shouldWidgetChangeWhenInEditMode = widgetType => {
    const widgetsThatDoNotChangeInEditMode = ['checkbox'];

    return !widgetsThatDoNotChangeInEditMode.includes(widgetType);
  };

  const handleTableCellKeyPress = e => {
    if (e.key === 'Enter') {
      enterEditMode();
    }
  };

  const enterEditMode = e => {
    setCurrentEditingRow(rowIndex);
    setCurrentCellYCoordinate(rowIndex);
    setCurrentEditingColumn(columnIndex);
    setCurrentCellXCoordinate(columnIndex);
    setNeedToSetFocusToTableCellInput(true);
  };

  const handleTableCellInputKeyDown = e => {
    e.persist();
    const key = e.key;

    switch (key) {
      case 'Tab':
        handleTabOnInputKeyPress(e);
        break;
      case 'Enter':
        handleEnterOnInputKeyPress(e);
        break;
      case 'Escape':
      case 'Esc':
        handleEscapeOnInputKeyPress(e);
        break;
      default:
      // do nothing
    }
  };

  const handleTabOnInputKeyPress = e => {
    updateCellData();

    const focusHasLeftTable =
      (isCellBottomRightInTable() && !e.shiftKey) ||
      (isCellTopLeftInTable() && e.shiftKey);

    if (focusHasLeftTable) {
      leaveEditMode();
    } else {
      e.preventDefault();

      if (e.shiftKey) {
        handleMovingFocusWithShiftTab();
      } else {
        handleMovingFocusWithTab();
      }
    }
  };

  const handleMovingFocusWithShiftTab = () => {
    const previousColumn = columnIndex - 1;

    if (previousColumn >= 0) {
      setCurrentEditingColumn(previousColumn);
      setCurrentCellXCoordinate(previousColumn);
    } else {
      setCurrentEditingColumn(numberOfColumns - 1);
      setCurrentCellXCoordinate(numberOfColumns - 1);
      setCurrentEditingRow(currentEditingRow - 1);
      setCurrentCellYCoordinate(currentEditingRow - 1);
    }
  };

  const handleMovingFocusWithTab = () => {
    const nextColumn = columnIndex + 1;

    if (nextColumn <= numberOfColumns - 1) {
      setCurrentEditingColumn(nextColumn);
      setCurrentCellXCoordinate(nextColumn);
    } else {
      setCurrentEditingColumn(0);
      setCurrentCellXCoordinate(0);
      setCurrentEditingRow(currentEditingRow + 1);
      setCurrentCellYCoordinate(currentEditingRow + 1);
    }
  };

  const handleEnterOnInputKeyPress = e => {
    updateCellData();

    if (e.shiftKey) {
      const previousRow = rowIndex - 1;
      setCurrentEditingRow(previousRow >= 0 ? previousRow : null);
      setCurrentCellYCoordinate(previousRow >= 0 ? previousRow : null);
    } else {
      const nextRow = rowIndex + 1;
      setCurrentEditingRow(nextRow <= numberOfRows - 1 ? nextRow : null);
      setCurrentCellYCoordinate(nextRow <= numberOfRows - 1 ? nextRow : null);
    }
  };

  const handleEscapeOnInputKeyPress = e => {
    e.stopPropagation();
    discardCellDataChanges();
    leaveEditMode();
    setNeedToSetFocusToTableCell(true);
  };

  const isCellBottomRightInTable = () =>
    rowIndex === numberOfRows - 1 && columnIndex === numberOfColumns - 1;

  const isCellTopLeftInTable = () => rowIndex === 0 && columnIndex === 0;

  const updateCellData = () => {
    let updatedTableData = [...currentTableData];
    updatedTableData = updatedTableData.map(tableRow => ({ ...tableRow }));
    updatedTableData[rowIndex][headerKey] = {
      ...updatedTableData[rowIndex][headerKey],
    };
    updatedTableData[rowIndex][headerKey].value = tableCellInputValue;
    setCurrentTableData(updatedTableData);
  };

  const discardCellDataChanges = () => {
    setTableCellInputValue(tableCellData.value);
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
      {shouldWidgetChangeWhenInEditMode(tableCellData.widgetType) ? (
        <input
          type="text"
          value={tableCellInputValue}
          onKeyDown={handleTableCellInputKeyDown}
          onChange={handleTableCellInputChange}
          ref={tableCellInputRef}
          className="textInput"
        />
      ) : (
        getTableCellWidget(tableCellData.widgetType)
      )}
    </td>
  ) : shouldTableCellHaveTabStopBasedOnWidget(tableCellData.widgetType) ? (
    <td className="tableCellThatContainsViewModeButton">
      <button
        className="tableCellViewModeButton"
        onKeyPress={handleTableCellKeyPress}
        onClick={setIsCurrentFocusedCell}
        onDoubleClick={enterEditMode}
        ref={tableCellRef}
        aria-label={`${tableCellData.value} - Press Enter to edit`}
        tabIndex={-1}
      >
        {getTableCellWidget(tableCellData.widgetType)}
      </button>
    </td>
  ) : (
    <td
      onKeyDown={handleTableCellKeyPress}
      onClick={setIsCurrentFocusedCell}
      tabIndex={-1}
    >
      {getTableCellWidget(tableCellData.widgetType)}
    </td>
  );
};
