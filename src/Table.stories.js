import React from 'react';
import { BasicTable } from './basicTable/BasicTable';
import { basicPokemonData } from './fixtures/basicPokemonData';
import { TableWithWidgetTypes } from './tableWithWidgetTypes/TableWithWidgetTypes';
import { pokemonDataWithWidgetTypes } from './fixtures/pokemonDataWithWidgetTypes';

export default {
  title: 'Tables',
};

export const _BasicTable = () => <BasicTable tableData={basicPokemonData} />;

export const _TableWithWidgetTypes = () => (
  <TableWithWidgetTypes tableData={pokemonDataWithWidgetTypes} />
);
