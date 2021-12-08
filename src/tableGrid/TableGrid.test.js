import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    expect(screen.getAllByRole('checkbox').length).toBe(numberOfRows);
    expect(screen.getAllByRole('link').length).toBe(numberOfRows);
  });

  it('allows the user to tab to the grid but to not the content inside it', () => {
    render(<TableGrid tableData={pokemonDataWithWidgetTypes} />);

    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(screen.getByRole('grid')).toHaveFocus();

    userEvent.tab();
    expect(document.body).toHaveFocus();
  });

  it('allows the user to tab to the grid and then use any arrow key to navigate to the top-left grid cell', () => {
    render(<TableGrid tableData={pokemonDataWithWidgetTypes} />);

    const grid = screen.getByRole('grid');

    const resetInitialGridFocus = () => {
      userEvent.tab();
      userEvent.tab();
      expect(grid).toHaveFocus();
    };

    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(grid).toHaveFocus();

    userEvent.type(grid, '{arrowup}', { skipClick: true });
    expect(
      screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
    ).toHaveFocus();

    resetInitialGridFocus();

    userEvent.type(grid, '{arrowdown}', { skipClick: true });
    expect(
      screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
    ).toHaveFocus();

    resetInitialGridFocus();

    userEvent.type(grid, '{arrowleft}', { skipClick: true });
    expect(
      screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
    ).toHaveFocus();

    resetInitialGridFocus();

    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(
      screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
    ).toHaveFocus();

    resetInitialGridFocus();

    userEvent.type(grid, '{end}', { skipClick: true });
    expect(
      screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
    ).toHaveFocus();

    resetInitialGridFocus();

    userEvent.type(grid, '{home}', { skipClick: true });
    expect(
      screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
    ).toHaveFocus();

    resetInitialGridFocus();
  });

  it('allows the user to navigate the grid using any of the four arrow keys', () => {
    render(<TableGrid tableData={pokemonDataWithWidgetTypes} />);

    const grid = screen.getByRole('grid');

    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(grid).toHaveFocus();

    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(
      screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
    ).toHaveFocus();

    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(screen.getByRole('cell', { name: '1' })).toHaveFocus();

    userEvent.type(grid, '{arrowdown}', { skipClick: true });
    expect(screen.getByRole('cell', { name: '2' })).toHaveFocus();

    userEvent.type(grid, '{arrowleft}', { skipClick: true });
    expect(
      screen.getByRole('checkbox', { name: 'Select Row - Ivysaur' })
    ).toHaveFocus();

    userEvent.type(grid, '{arrowup}', { skipClick: true });
    expect(
      screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
    ).toHaveFocus();
  });

  it('allows the user to navigate to the last cell in the current row using the End key', () => {
    render(<TableGrid tableData={pokemonDataWithWidgetTypes} />);

    const grid = screen.getByRole('grid');

    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(grid).toHaveFocus();

    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(
      screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
    ).toHaveFocus();

    userEvent.type(grid, '{end}', { skipClick: true });
    expect(
      screen.getAllByRole('cell', {
        name: 'One of the three starter Pokémon',
      })[0]
    ).toHaveFocus();
  });

  it('allows the user to navigate to the last cell in the last row using the Control+End keys', () => {
    render(<TableGrid tableData={pokemonDataWithWidgetTypes} />);

    const grid = screen.getByRole('grid');

    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(grid).toHaveFocus();

    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(
      screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
    ).toHaveFocus();

    userEvent.type(grid, '{ctrl}{end}', { skipClick: true });
    expect(
      screen.getByRole('cell', {
        name: 'Evolves from Wartortle',
      })
    ).toHaveFocus();
  });

  it('allows the user to navigate to the first cell in the current row using the Home key', () => {
    render(<TableGrid tableData={pokemonDataWithWidgetTypes} />);

    const grid = screen.getByRole('grid');

    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(grid).toHaveFocus();

    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(
      screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
    ).toHaveFocus();

    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(screen.getByRole('cell', { name: '1' })).toHaveFocus();

    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(screen.getByRole('link', { name: 'Bulbasaur' })).toHaveFocus();

    userEvent.type(grid, '{arrowdown}', { skipClick: true });
    expect(screen.getByRole('link', { name: 'Ivysaur' })).toHaveFocus();

    userEvent.type(grid, '{home}', { skipClick: true });
    expect(
      screen.getByRole('checkbox', { name: 'Select Row - Ivysaur' })
    ).toHaveFocus();
  });

  it('allows the user to navigate to the first cell in the first row using the Control+Home keys', () => {
    render(<TableGrid tableData={pokemonDataWithWidgetTypes} />);

    const grid = screen.getByRole('grid');

    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(grid).toHaveFocus();

    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(
      screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
    ).toHaveFocus();

    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(screen.getByRole('cell', { name: '1' })).toHaveFocus();

    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(screen.getByRole('link', { name: 'Bulbasaur' })).toHaveFocus();

    userEvent.type(grid, '{arrowdown}', { skipClick: true });
    expect(screen.getByRole('link', { name: 'Ivysaur' })).toHaveFocus();

    userEvent.type(grid, '{ctrl}{home}', { skipClick: true });
    expect(
      screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
    ).toHaveFocus();
  });

  it('does not wrap navigation of the grid from the end of one row to the beginning of the next', () => {
    render(<TableGrid tableData={pokemonDataWithWidgetTypes} />);

    const grid = screen.getByRole('grid');

    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(grid).toHaveFocus();

    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(
      screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
    ).toHaveFocus();

    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(screen.getByRole('cell', { name: '1' })).toHaveFocus();

    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(screen.getByRole('link', { name: 'Bulbasaur' })).toHaveFocus();

    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(screen.getAllByRole('cell', { name: 'Grass' })[0]).toHaveFocus();

    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(
      screen.getAllByRole('cell', {
        name: 'One of the three starter Pokémon',
      })[0]
    ).toHaveFocus();

    // Focus does not move because you are already on the right border of the grid
    userEvent.type(grid, '{arrowright}', { skipClick: true });
    expect(
      screen.getAllByRole('cell', {
        name: 'One of the three starter Pokémon',
      })[0]
    ).toHaveFocus();
  });

  it('sets the focus to the clicked cell when a user uses a mouse to click any given cell', () => {
    const { container } = render(
      <TableGrid tableData={pokemonDataWithWidgetTypes} />
    );

    const gridCells = container.querySelectorAll('td');
    const firstCheckboxCell = gridCells[0];
    const firstTextCell = gridCells[1];
    const firstLinkCell = gridCells[2];

    // Focus is set to the checkbox itself, not the cell containing the checkbox
    const checkboxWithFirstCheckboxCell = screen.getByRole('checkbox', {
      name: 'Select Row - Bulbasaur',
    });
    userEvent.click(firstCheckboxCell);
    expect(checkboxWithFirstCheckboxCell).toHaveFocus();

    // Focus is set to the cell containing the text
    const textCell = screen.getByRole('cell', { name: '1' });
    userEvent.click(firstTextCell);
    expect(textCell).toHaveFocus();

    // Focus is set to the link itself, not the cell containing the link
    const linkWithinFirstLinkCell = screen.getByRole('link', {
      name: 'Bulbasaur',
    });
    userEvent.click(firstLinkCell);
    expect(linkWithinFirstLinkCell).toHaveFocus();
  });
});
