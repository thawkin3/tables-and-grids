import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BasicEditableTable } from './BasicEditableTable';
import { basicPokemonData } from '../fixtures/basicPokemonData';

describe('BasicEditableTable', () => {
  it('renders a table element', () => {
    render(<BasicEditableTable tableData={basicPokemonData} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders a table header with the appropriate data', () => {
    const { container } = render(
      <BasicEditableTable tableData={basicPokemonData} />
    );

    const tableHeaders = Object.keys(basicPokemonData[0]);
    const numberOfColumns = tableHeaders.length;

    expect(container.querySelector('thead')).toBeInTheDocument();
    expect(container.querySelectorAll('th').length).toBe(numberOfColumns);

    tableHeaders.forEach(tableHeader => {
      expect(screen.getByText(tableHeader)).toBeInTheDocument();
    });
  });

  it('renders a table body with the appropriate data', () => {
    const { container } = render(
      <BasicEditableTable tableData={basicPokemonData} />
    );

    const tableHeaders = Object.keys(basicPokemonData[0]);
    const numberOfColumns = tableHeaders.length;
    const numberOfRows = basicPokemonData.length;
    const numberOfTableBodyCells = numberOfColumns * numberOfRows;

    expect(container.querySelector('tbody')).toBeInTheDocument();
    expect(container.querySelectorAll('td').length).toBe(
      numberOfTableBodyCells
    );

    basicPokemonData.forEach((tableRow, rowIndex) => {
      const tableRowInDOM = container.querySelectorAll('tbody tr')[rowIndex];
      const tableRowCells = Object.values(tableRow);

      tableRowCells.forEach((tableCellData, columnIndex) => {
        const tableCellInDOM =
          tableRowInDOM.querySelectorAll('td')[columnIndex];

        expect(tableCellInDOM.textContent).toBe(String(tableCellData));
      });
    });
  });

  describe('Read-Only Mode', () => {
    it('renders each table cell as a button', () => {
      render(<BasicEditableTable tableData={basicPokemonData} />);

      const tableHeaders = Object.keys(basicPokemonData[0]);
      const numberOfColumns = tableHeaders.length;
      const numberOfRows = basicPokemonData.length;
      const numberOfTableBodyCells = numberOfColumns * numberOfRows;

      expect(screen.getAllByRole('button').length).toBe(numberOfTableBodyCells);
    });

    it('includes an aria-label for each table cell button to instruct screen reader users how to enter Edit Mode', () => {
      render(<BasicEditableTable tableData={basicPokemonData} />);

      expect(
        screen.getByRole('button', { name: '1 - Press Enter to edit' })
      ).toBeInTheDocument();
    });

    it('allows the user to tab to each cell in the table', () => {
      render(<BasicEditableTable tableData={basicPokemonData} />);

      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(
        screen.getByRole('button', { name: '1 - Press Enter to edit' })
      ).toHaveFocus();

      userEvent.tab();
      expect(
        screen.getByRole('button', { name: 'Bulbasaur - Press Enter to edit' })
      ).toHaveFocus();

      userEvent.tab();
      expect(
        screen.getAllByRole('button', {
          name: 'Grass - Press Enter to edit',
        })[0]
      ).toHaveFocus();

      userEvent.tab();
      expect(
        screen.getAllByRole('button', {
          name: 'One of the three starter Pokémon - Press Enter to edit',
        })[0]
      ).toHaveFocus();

      userEvent.tab();
      expect(
        screen.getByRole('button', { name: '2 - Press Enter to edit' })
      ).toHaveFocus();
    });

    it("allows the user to press Enter on any cell to enter Edit Mode for that cell's row", () => {
      render(<BasicEditableTable tableData={basicPokemonData} />);

      expect(document.body).toHaveFocus();

      const firstCellInTable = screen.getByRole('button', {
        name: '1 - Press Enter to edit',
      });

      userEvent.tab();
      expect(firstCellInTable).toHaveFocus();

      userEvent.type(firstCellInTable, '{enter}');

      const tableHeaders = Object.keys(basicPokemonData[0]);
      const numberOfColumns = tableHeaders.length;
      const numberOfRows = basicPokemonData.length;
      const numberOfTableBodyCells = numberOfColumns * numberOfRows;

      // The current row's cells should be in Edit Mode as text inputs,
      // and the rest of the rows' cells should still be in View Mode as buttons
      expect(screen.getAllByRole('textbox').length).toBe(numberOfColumns);
      expect(screen.getAllByRole('button').length).toBe(
        numberOfTableBodyCells - numberOfColumns
      );
    });

    it("allows the user to double click on any cell to enter Edit Mode for that cell's row", () => {
      render(<BasicEditableTable tableData={basicPokemonData} />);

      const firstCellInTable = screen.getByRole('button', {
        name: '1 - Press Enter to edit',
      });

      userEvent.dblClick(firstCellInTable);

      const tableHeaders = Object.keys(basicPokemonData[0]);
      const numberOfColumns = tableHeaders.length;
      const numberOfRows = basicPokemonData.length;
      const numberOfTableBodyCells = numberOfColumns * numberOfRows;

      // The current row's cells should be in Edit Mode as text inputs,
      // and the rest of the rows' cells should still be in View Mode as buttons
      expect(screen.getAllByRole('textbox').length).toBe(numberOfColumns);
      expect(screen.getAllByRole('button').length).toBe(
        numberOfTableBodyCells - numberOfColumns
      );
    });
  });
});
