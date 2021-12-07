import React from 'react';
import { basicPokemonData } from './fixtures/basicPokemonData';
import { BasicEditableTable } from './basicEditableTable/BasicEditableTable';

export default {
  title: 'Editable Tables',
};

export const _BasicEditableTable = () => (
  <>
    <h1>Basic Editable Table</h1>
    <BasicEditableTable tableData={basicPokemonData} />
  </>
);
