import React from 'react';
import { Table } from './Table';

export default {
  title: 'Tables',
  component: Table,
};

export const BasicTable = () => <Table tableData={pokemonData} />;

const pokemonData = [
  { id: 1, name: 'Bulbasaur', type: 'Grass', notes: 'add notes here' },
  { id: 2, name: 'Ivysaur', type: 'Grass', notes: 'add notes here' },
  { id: 3, name: 'Venasaur', type: 'Grass', notes: 'add notes here' },
  { id: 4, name: 'Charmander', type: 'Fire', notes: 'add notes here' },
  { id: 5, name: 'Charmeleon', type: 'Fire', notes: 'add notes here' },
  { id: 6, name: 'Charizard', type: 'Fire', notes: 'add notes here' },
  { id: 7, name: 'Squirtle', type: 'Water', notes: 'add notes here' },
  { id: 8, name: 'Wartortle', type: 'Water', notes: 'add notes here' },
  { id: 9, name: 'Blastoise', type: 'Water', notes: 'add notes here' },
];
