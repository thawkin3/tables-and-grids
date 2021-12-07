import React from 'react';
import { basicPokemonData } from './fixtures/basicPokemonData';
import { pokemonDataWithWidgetTypes } from './fixtures/pokemonDataWithWidgetTypes';
import { BasicTable } from './basicTable/BasicTable';
import { TableWithWidgetTypes } from './tableWithWidgetTypes/TableWithWidgetTypes';
import { TableGrid } from './tableGrid/TableGrid';

export default {
  title: 'Read-Only Tables',
};

export const _BasicTable = () => (
  <>
    <h1>Basic Table</h1>
    <p>
      This is a basic table. The table content is read-only, so none of the
      cells are tabbable, focusable, or interactive. The columns are not
      sortable, reorderable, or resizable. The table data is not filterable.
    </p>
    <p>
      Mouse users and keyboard users have nothing to interact with. Screen
      reader users can navigate using normal table navigation commands.
    </p>
    <BasicTable tableData={basicPokemonData} />
  </>
);

export const _TableWithWidgetTypes = () => (
  <>
    <h1>Table with Various Widget Types</h1>
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
      Mouse users can click to check and uncheck the checkboxes. Mouse users can
      click on the links to visit them.
    </p>
    <p>
      Keyboard users can tab to the checkboxes and links and interact with them
      through normal keyboard commands (Space to check/uncheck the checkboxes
      and Enter to visit a link).
    </p>
    <p>
      Screen reader users can navigate using normal table navigation commands
      and can also interact with the checkboxes and links using normal screen
      reader commands.
    </p>
    <TableWithWidgetTypes tableData={pokemonDataWithWidgetTypes} />
  </>
);

export const _TableGrid = () => (
  <>
    <h1>Table Grid</h1>
    <p>
      This is a table grid capable of rendering various widget types in the
      table cells. This table features checkboxes, text, and links. The checkbox
      and link elements are naturally tabbable, focusable, and interactive. But,
      since this table is rendered as a grid, we'll override the normal table
      navigation to allow the user to instead navigate using the arrow keys.
    </p>
    <p>
      The columns are not sortable, reorderable, or resizable. The table data is
      not filterable.
    </p>
    <p>
      Mouse users can click to check and uncheck the checkboxes. Mouse users can
      click on the links to visit them.
    </p>
    <p>
      Keyboard users can tab to the grid itself, which is a single tab stop.
      After that, keyboard users can navigate the grid using the arrow keys to
      move between table cells. Each table cell is tabbable/focusable regardless
      of whether or not the cell contains interactive content. This is important
      so as to not block keyboard users from navigating to certain cells. When
      focusing on an interactive cell, keyboard users can interact with the
      checkboxes and links through normal keyboard commands (Space to
      check/uncheck the checkboxes and Enter to visit a link).
    </p>
    <p>
      Screen reader users can navigate using normal table navigation commands
      and can also interact with the checkboxes and links using normal screen
      reader commands.
    </p>
    <TableGrid tableData={pokemonDataWithWidgetTypes} />
  </>
);
