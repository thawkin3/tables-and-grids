import React from 'react';
import { render, screen } from '@testing-library/react';
import { TableGrid } from './TableGrid';
import { pokemonDataWithWidgetTypes } from '../fixtures/pokemonDataWithWidgetTypes';

describe('TableGrid', () => {
  it('renders a table element with a "grid" role', () => {
    render(<TableGrid tableData={pokemonDataWithWidgetTypes} />);

    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('renders a table header with the appropriate data', () => {
    const { container } = render(
      <TableGrid tableData={pokemonDataWithWidgetTypes} />
    );

    const tableHeaders = Object.keys(pokemonDataWithWidgetTypes[0]);
    const numberOfColumns = tableHeaders.length;

    expect(container.querySelector('thead')).toBeInTheDocument();
    expect(container.querySelectorAll('th').length).toBe(numberOfColumns);

    tableHeaders.forEach(tableHeader => {
      expect(screen.getByText(tableHeader)).toBeInTheDocument();
    });
  });

  it('renders a table body with the appropriate data', () => {
    const { container } = render(
      <TableGrid tableData={pokemonDataWithWidgetTypes} />
    );

    const tableHeaders = Object.keys(pokemonDataWithWidgetTypes[0]);
    const numberOfColumns = tableHeaders.length;
    const numberOfRows = pokemonDataWithWidgetTypes.length;
    const numberOfTableBodyCells = numberOfColumns * numberOfRows;

    expect(container.querySelector('tbody')).toBeInTheDocument();
    expect(container.querySelectorAll('td').length).toBe(
      numberOfTableBodyCells
    );
  });
});
