import React from 'react';
import { basicPokemonData } from './fixtures/basicPokemonData';
import { pokemonDataWithWidgetTypes } from './fixtures/pokemonDataWithWidgetTypes';
import { BasicEditableTable } from './basicEditableTable/BasicEditableTable';
import { EditableTableWithWidgetTypes } from './editableTableWithWidgetTypes/EditableTableWithWidgetTypes';
import { EditableTableGrid } from './editableTableGrid/EditableTableGrid';

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
      This is a table capable of rendering various widget types in the table
      cells. This table features checkboxes, text, and links. The checkbox and
      link elements are naturally tabbable, focusable, and interactive.
    </p>
    <p>
      The columns are not sortable, reorderable, or resizable. The table data is
      not filterable.
    </p>
    <p>
      Because the table is editable, when it's in View Mode, each one of the
      cells is tabbable, focusable, and interactive.
    </p>
    <p>
      <b>TODO:</b>
    </p>
    <ul>
      <li>
        When in View Mode, the link element is nested inside the button element,
        which means that screen readers can't access the link element. This is
        an example of improperly nested interactive content.
      </li>
      <li>
        When in Edit Mode, if you are using a screen reader and make an edit to
        one text input, then move to the next cell using the
        Control+Option+Space key, then press Escape, the changes are not saved
        on the previously edited cell. I believe this is because the focused
        element doesn't actually change, so the save function doesn't get
        called. This is problematic for screen reader users when editing the
        table data and then leaving Edit Mode.
      </li>
    </ul>
    <h2>Mouse Users</h2>
    <p>
      <b>When in View Mode</b>: Click checkboxes to check/uncheck them. Click
      links to visit them. Double click any cell to enter Edit Mode for that
      specific cell's row.
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
      cell's row. Every cell has a tab stop except for the checkbox cell.
    </p>
    <p>
      For the checkbox cell, the focus goes to the checbox itself but not the
      cell. The checkbox can be checked/unchecked in View Mode using the Space
      key. Pressing the Enter key on a checkbox will not check/uncheck the
      checkbox but will enter Edit Mode.
    </p>
    <p>
      The link cell has two tab stops: one for the cell itself and one for the
      link. This is important so that the user can use the first tab stop to
      press Enter on the cell to enter Edit Mode or use the second tab stop to
      press Enter to visit the link.
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
      commands. Check/uncheck checkboxes by pressing the Control+Option+Space
      keys (for VoiceOver). Visit links by pressing the Control+Option+Space
      keys (for VoiceOver). Enter Edit Mode by pressing the Enter key on any
      cell.
    </p>
    <p>
      <b>When in Edit Mode</b>: Navigate the table using normal table navigation
      commands. Because screen reader navigation differs from normal keyboard
      navigation, navigating between rows while in Edit Mode does not change the
      currently focused cell or move the current editing row between rows.
      Screen reader users can exit Edit Mode by pressing the Escape key.
    </p>
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
      <li>Add documentation here</li>
      <li>Audit current functionality and log bugs</li>
    </ul>
    <EditableTableGrid tableData={pokemonDataWithWidgetTypes} />
  </>
);
