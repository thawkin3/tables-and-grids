import React from 'react';
import { basicPokemonData } from './fixtures/basicPokemonData';
import { pokemonDataWithWidgetTypes } from './fixtures/pokemonDataWithWidgetTypes';
import { BasicEditableTable } from './basicEditableTable/BasicEditableTable';
import { EditableTableWithWidgetTypes } from './editableTableWithWidgetTypes/EditableTableWithWidgetTypes';

export default {
  title: 'Editable Tables',
};

export const _BasicEditableTable = () => (
  <>
    <h1>Basic Editable Table</h1>
    <p>
      This is a basic editable table. The only content type included in the
      table is text. The columns are not sortable, reorderable, or resizable.
      The table data is not filterable.
    </p>
    <p>
      Because the table is editable, when it's in View Mode, each one of the
      cells is tabbable, focusable, and interactive.
    </p>
    <h2>Mouse Users</h2>
    <p>
      <b>When in View Mode</b>: Double click any cell to enter Edit Mode for
      that specific cell's row.
    </p>
    <p>
      <b>When in Edit Mode</b>: Change any of the data (using the keyboard to
      type though, of course) and click outside of the table to leave Edit Mode
      and go back to View Mode.
    </p>
    <h2>Keyboard Users</h2>
    <p>
      <b>When in View Mode</b>: Use the Tab key to navigate each cell and then
      press the Enter key on any cell to enter Edit Mode for that specific
      cell's row.
    </p>
    <p>
      <b>When in Edit Mode</b>:
    </p>
    <ul>
      <li>
        <b>Tab</b>: Navigates right one cell and saves changes (if any). If you
        are on the last cell in a row, focus moves to the first cell in the next
        row. If you are on the last cell in the last row, focus moves outside of
        the table and exits Edit Mode.
      </li>
      <li>
        <b>Shift+Tab</b>: Navigates left one cell and saves changes (if any). If
        you are on the first cell in a row, focus moves to the last cell in the
        previous row. If you are on the first cell in the first row, focus moves
        outside of the table and exits Edit Mode.
      </li>
      <li>
        <b>Enter</b>: Navigates down one cell and saves changes (if any). If you
        are on a cell in the last row, focus moves outside of the table and
        exits Edit Mode.
      </li>
      <li>
        <b>Shift+Enter</b>: Navigates up one cell and saves changes (if any). If
        you are on a cell in the first row, focus moves outside of the table and
        exits Edit Mode.
      </li>
      <li>
        <b>Escape</b>: Exits Edit Mode and keeps focus on the current cell that
        previously had focus. Changes (if any) to the current cell are not
        saved.
      </li>
    </ul>
    <h2>Screen Reader Users</h2>
    <p>
      <b>When in View Mode</b>: Navigate the table using normal table navigation
      commands. Enter Edit Mode by pressing the Enter key on any cell.
    </p>
    <p>
      <b>When in Edit Mode</b>: Navigate the table using normal table navigation
      commands. Because screen reader navigation differs from normal keyboard
      navigation, navigating between rows while in Edit Mode does not change the
      currently focused cell or move the current editing row between rows.
      Screen reader users can exit Edit Mode by pressing the Escape key.
    </p>
    <BasicEditableTable tableData={basicPokemonData} />
  </>
);

export const _EditableTableWithWidgetTypes = () => (
  <>
    <h1>Editable Table with Widget Types</h1>
    <p>
      <b>WORK IN PROGRESS. TODO:</b>
    </p>
    <ul>
      <li>
        Should the tab stops only have one per cell? Right now the checkbox cell
        and the link cell have two tab stops, one for the cell and one for the
        checkbox/link, but there should probably be just the one tab stop on the
        checkbox/link and not the cell.
      </li>
      <li>
        When in Edit Mode, the checkbox widget should not change. Right now it
        changes to a text input just like all the other widgets, but it should
        be unaffected and stay as a checkbox widget.
      </li>
      <li>Update tests once the above two issues are resolved.</li>
      <li>
        Pressing Escape anywhere on the table should exit Edit Mode. This is
        probably a bug in the Basic Editable Table too.
      </li>
    </ul>
    <EditableTableWithWidgetTypes tableData={pokemonDataWithWidgetTypes} />
  </>
);

export const _EditableTableGrid = () => (
  <>
    <h1>Editable Table Grid</h1>
    <p>
      <b>WORK IN PROGRESS. TODO:</b>
    </p>
    <ul>
      <li>Create example</li>
    </ul>
  </>
);
