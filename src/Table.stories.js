import React from 'react';
import { BasicTable } from './basicTable/BasicTable';
import { basicPokemonData } from './fixtures/basicPokemonData';
import { TableWithWidgetTypes } from './tableWithWidgetTypes/TableWithWidgetTypes';
import { pokemonDataWithWidgetTypes } from './fixtures/pokemonDataWithWidgetTypes';

export default {
  title: 'Read-Only Tables',
};

export const _BasicTable = () => (
  <>
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
