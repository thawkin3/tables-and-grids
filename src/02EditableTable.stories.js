import React from 'react';
import { basicPokemonData } from './fixtures/basicPokemonData';
import { BasicEditableTable } from './basicEditableTable/BasicEditableTable';

export default {
  title: 'Editable Tables',
};

export const _BasicEditableTable = () => (
  <>
    <h1>Basic Editable Table</h1>
    <p>
      <b>WORK IN PROGRESS. TODO:</b>
    </p>
    <ul>
      <li>
        When in Edit Mode, clicking away should cause you to exit Edit Mode
      </li>
      <li>
        When in Edit Mode, pressing Tab should navigate from the end of one row
        to the beginning of the next row
      </li>
      <li>
        Make sure the Escape key discards edits, both in the View Mode text and
        in the Edit Mode text input
      </li>
      <li>Add appropriate aria-labels and instructions for screen readers</li>
    </ul>
    <p>
      This is a basic editable table. The only content type included in the
      table is text. The columns are not sortable, reorderable, or resizable.
      The table data is not filterable.
    </p>
    <p>
      Because the table is editable, when it's in View Mode, each one of the
      cells is tabbable, focusable, and interactive.
    </p>
    <p>
      When in View Mode, mouse users can double click any cell to enter Edit
      Mode for that specific cell's row. When in Edit Mode, mouse users can
      change any of the data (using the keyboard though, of course) and then can
      click away to leave Edit Mode and go back to View Mode.
    </p>
    <p>
      When in View Mode, keyboard users can use the Tab key to navigate each
      cell and then press the Enter key on any cell to enter Edit Mode for that
      specific cell's row. When in Edit Mode, keyboard users can change any of
      the data and then press the Enter key or Escape key to leave Edit Mode and
      go back to View Mode. If the Escape Key is pressed while in Edit Mode,
      changes to the current cell are not saved.
    </p>
    <p>
      When in View Mode, screen reader users can navigate the table using normal
      table navigation commands.
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
      <li>Create example</li>
    </ul>
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
