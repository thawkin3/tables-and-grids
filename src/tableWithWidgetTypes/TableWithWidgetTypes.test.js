import React from 'react';
import { render, screen } from '@testing-library/react';
import { TableWithWidgetTypes } from './TableWithWidgetTypes';
import { pokemonDataWithWidgetTypes } from '../fixtures/pokemonDataWithWidgetTypes';

describe('TableWithWidgetTypes', () => {
  it('renders a table element', () => {
    render(<TableWithWidgetTypes tableData={pokemonDataWithWidgetTypes} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders a table header with the appropriate data', () => {
    const { container } = render(
      <TableWithWidgetTypes tableData={pokemonDataWithWidgetTypes} />
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
      <TableWithWidgetTypes tableData={pokemonDataWithWidgetTypes} />
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
