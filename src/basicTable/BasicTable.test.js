import React from 'react';
import { render, screen } from '@testing-library/react';
import { BasicTable } from './BasicTable';
import { basicPokemonData } from '../fixtures/basicPokemonData';

describe('BasicTable', () => {
  it('renders a table element', () => {
    render(<BasicTable tableData={basicPokemonData} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders a table header with the appropriate data', () => {
    const { container } = render(<BasicTable tableData={basicPokemonData} />);

    const tableHeaders = Object.keys(basicPokemonData[0]);
    const numberOfColumns = tableHeaders.length;

    expect(container.querySelector('thead')).toBeInTheDocument();
    expect(container.querySelectorAll('th').length).toBe(numberOfColumns);

    tableHeaders.forEach(tableHeader => {
      expect(screen.getByText(tableHeader)).toBeInTheDocument();
    });
  });

  it('renders a table body with the appropriate data', () => {
    const { container } = render(<BasicTable tableData={basicPokemonData} />);

    const tableHeaders = Object.keys(basicPokemonData[0]);
    const numberOfColumns = tableHeaders.length;
    const numberOfRows = basicPokemonData.length;
    const numberOfTableBodyCells = numberOfColumns * numberOfRows;

    expect(container.querySelector('tbody')).toBeInTheDocument();
    expect(container.querySelectorAll('td').length).toBe(
      numberOfTableBodyCells
    );
  });
});
