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

  describe('View Mode', () => {
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

  describe('Edit Mode', () => {
    const enterEditMode = () => {
      const firstCellInTable = screen.getByRole('button', {
        name: '1 - Press Enter to edit',
      });

      userEvent.tab();

      userEvent.type(firstCellInTable, '{enter}');
    };

    describe('table navigation', () => {
      describe('Tab key', () => {
        it('moves focus right by one cell when the user presses Tab', () => {
          render(<BasicEditableTable tableData={basicPokemonData} />);
          enterEditMode();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          const secondTextInputInFirstRow =
            screen.getByDisplayValue('Bulbasaur');
          const thirdTextInputInFirstRow =
            screen.getAllByDisplayValue('Grass')[0];
          const fourthTextInputInFirstRow = screen.getAllByDisplayValue(
            'One of the three starter Pokémon'
          )[0];

          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(secondTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(thirdTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(fourthTextInputInFirstRow).toHaveFocus();
        });

        it('moves focus to the first cell in the next row when the user presses Tab on the last cell in a row', () => {
          render(<BasicEditableTable tableData={basicPokemonData} />);
          enterEditMode();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          const secondTextInputInFirstRow =
            screen.getByDisplayValue('Bulbasaur');
          const thirdTextInputInFirstRow =
            screen.getAllByDisplayValue('Grass')[0];
          const fourthTextInputInFirstRow = screen.getAllByDisplayValue(
            'One of the three starter Pokémon'
          )[0];

          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(secondTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(thirdTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(fourthTextInputInFirstRow).toHaveFocus();

          userEvent.tab();

          const firstTextInputInSecondRow = screen.getByDisplayValue('2');
          expect(firstTextInputInSecondRow).toHaveFocus();
        });

        it('leaves Edit Mode when the user presses Tab on the last cell in the last row', () => {
          render(<BasicEditableTable tableData={basicPokemonData} />);
          enterEditMode();

          const lastCellButtonInLastRow = screen.getByRole('button', {
            name: 'Evolves from Wartortle - Press Enter to edit',
          });
          userEvent.dblClick(lastCellButtonInLastRow);

          const lastCellInputInLastRow = screen.getByDisplayValue(
            'Evolves from Wartortle'
          );
          expect(lastCellInputInLastRow).toHaveFocus();

          userEvent.tab();
          expect(document.body).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });

        it('moves focus left by one cell when the user presses Shift+Tab', () => {
          render(<BasicEditableTable tableData={basicPokemonData} />);
          enterEditMode();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          const secondTextInputInFirstRow =
            screen.getByDisplayValue('Bulbasaur');
          const thirdTextInputInFirstRow =
            screen.getAllByDisplayValue('Grass')[0];
          const fourthTextInputInFirstRow = screen.getAllByDisplayValue(
            'One of the three starter Pokémon'
          )[0];

          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(secondTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(thirdTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(fourthTextInputInFirstRow).toHaveFocus();

          userEvent.tab({ shift: true });
          expect(thirdTextInputInFirstRow).toHaveFocus();

          userEvent.tab({ shift: true });
          expect(secondTextInputInFirstRow).toHaveFocus();

          userEvent.tab({ shift: true });
          expect(firstTextInputInFirstRow).toHaveFocus();
        });

        it('moves focus to the last cell in the previous row when the user presses Shift+Tab on the first cell in a row', () => {
          render(<BasicEditableTable tableData={basicPokemonData} />);
          enterEditMode();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          const secondTextInputInFirstRow =
            screen.getByDisplayValue('Bulbasaur');
          const thirdTextInputInFirstRow =
            screen.getAllByDisplayValue('Grass')[0];
          let fourthTextInputInFirstRow = screen.getAllByDisplayValue(
            'One of the three starter Pokémon'
          )[0];

          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(secondTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(thirdTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(fourthTextInputInFirstRow).toHaveFocus();

          userEvent.tab();

          const firstTextInputInSecondRow = screen.getByDisplayValue('2');
          expect(firstTextInputInSecondRow).toHaveFocus();

          userEvent.tab({ shift: true });

          fourthTextInputInFirstRow = screen.getAllByDisplayValue(
            'One of the three starter Pokémon'
          )[0];
          expect(fourthTextInputInFirstRow).toHaveFocus();
        });

        it('leaves Edit Mode when the user presses Shift+Tab on the first cell in the first row', () => {
          render(<BasicEditableTable tableData={basicPokemonData} />);
          enterEditMode();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.tab({ shift: true });
          expect(document.body).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });
      });

      describe('Enter key', () => {
        it('moves focus down by one cell when the user presses Enter', () => {
          render(<BasicEditableTable tableData={basicPokemonData} />);
          enterEditMode();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.type(firstTextInputInFirstRow, '{enter}');

          const firstTextInputInSecondRow = screen.getByDisplayValue('2');
          expect(firstTextInputInSecondRow).toHaveFocus();

          userEvent.type(firstTextInputInSecondRow, '{enter}');

          const firstTextInputInThirdRow = screen.getByDisplayValue('3');
          expect(firstTextInputInThirdRow).toHaveFocus();

          userEvent.type(firstTextInputInThirdRow, '{enter}');

          const firstTextInputInFourthRow = screen.getByDisplayValue('4');
          expect(firstTextInputInFourthRow).toHaveFocus();

          userEvent.type(firstTextInputInFourthRow, '{enter}');

          const firstTextInputInFifthRow = screen.getByDisplayValue('5');
          expect(firstTextInputInFifthRow).toHaveFocus();

          userEvent.type(firstTextInputInFifthRow, '{enter}');

          const firstTextInputInSixthRow = screen.getByDisplayValue('6');
          expect(firstTextInputInSixthRow).toHaveFocus();

          userEvent.type(firstTextInputInSixthRow, '{enter}');

          const firstTextInputInSeventhRow = screen.getByDisplayValue('7');
          expect(firstTextInputInSeventhRow).toHaveFocus();

          userEvent.type(firstTextInputInSeventhRow, '{enter}');

          const firstTextInputInEighthRow = screen.getByDisplayValue('8');
          expect(firstTextInputInEighthRow).toHaveFocus();

          userEvent.type(firstTextInputInEighthRow, '{enter}');

          const firstTextInputInNinthRow = screen.getByDisplayValue('9');
          expect(firstTextInputInNinthRow).toHaveFocus();
        });

        it('leaves Edit Mode when the user presses Enter on any cell in the last row', () => {
          render(<BasicEditableTable tableData={basicPokemonData} />);
          enterEditMode();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.type(firstTextInputInFirstRow, '{enter}');

          const firstTextInputInSecondRow = screen.getByDisplayValue('2');
          expect(firstTextInputInSecondRow).toHaveFocus();

          userEvent.type(firstTextInputInSecondRow, '{enter}');

          const firstTextInputInThirdRow = screen.getByDisplayValue('3');
          expect(firstTextInputInThirdRow).toHaveFocus();

          userEvent.type(firstTextInputInThirdRow, '{enter}');

          const firstTextInputInFourthRow = screen.getByDisplayValue('4');
          expect(firstTextInputInFourthRow).toHaveFocus();

          userEvent.type(firstTextInputInFourthRow, '{enter}');

          const firstTextInputInFifthRow = screen.getByDisplayValue('5');
          expect(firstTextInputInFifthRow).toHaveFocus();

          userEvent.type(firstTextInputInFifthRow, '{enter}');

          const firstTextInputInSixthRow = screen.getByDisplayValue('6');
          expect(firstTextInputInSixthRow).toHaveFocus();

          userEvent.type(firstTextInputInSixthRow, '{enter}');

          const firstTextInputInSeventhRow = screen.getByDisplayValue('7');
          expect(firstTextInputInSeventhRow).toHaveFocus();

          userEvent.type(firstTextInputInSeventhRow, '{enter}');

          const firstTextInputInEighthRow = screen.getByDisplayValue('8');
          expect(firstTextInputInEighthRow).toHaveFocus();

          userEvent.type(firstTextInputInEighthRow, '{enter}');

          const firstTextInputInNinthRow = screen.getByDisplayValue('9');
          expect(firstTextInputInNinthRow).toHaveFocus();

          userEvent.type(firstTextInputInNinthRow, '{enter}');

          expect(document.body).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });

        it('moves focus up by one cell when the user presses Shift+Enter', () => {
          render(<BasicEditableTable tableData={basicPokemonData} />);
          enterEditMode();

          let firstTextInputInFirstRow = screen.getByDisplayValue('1');
          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.type(firstTextInputInFirstRow, '{enter}');

          let firstTextInputInSecondRow = screen.getByDisplayValue('2');
          expect(firstTextInputInSecondRow).toHaveFocus();

          userEvent.type(firstTextInputInSecondRow, '{enter}');

          let firstTextInputInThirdRow = screen.getByDisplayValue('3');
          expect(firstTextInputInThirdRow).toHaveFocus();

          userEvent.type(firstTextInputInThirdRow, '{enter}');

          let firstTextInputInFourthRow = screen.getByDisplayValue('4');
          expect(firstTextInputInFourthRow).toHaveFocus();

          userEvent.type(firstTextInputInFourthRow, '{enter}');

          let firstTextInputInFifthRow = screen.getByDisplayValue('5');
          expect(firstTextInputInFifthRow).toHaveFocus();

          userEvent.type(firstTextInputInFifthRow, '{enter}');

          let firstTextInputInSixthRow = screen.getByDisplayValue('6');
          expect(firstTextInputInSixthRow).toHaveFocus();

          userEvent.type(firstTextInputInSixthRow, '{enter}');

          let firstTextInputInSeventhRow = screen.getByDisplayValue('7');
          expect(firstTextInputInSeventhRow).toHaveFocus();

          userEvent.type(firstTextInputInSeventhRow, '{enter}');

          let firstTextInputInEighthRow = screen.getByDisplayValue('8');
          expect(firstTextInputInEighthRow).toHaveFocus();

          userEvent.type(firstTextInputInEighthRow, '{enter}');

          const firstTextInputInNinthRow = screen.getByDisplayValue('9');
          expect(firstTextInputInNinthRow).toHaveFocus();

          userEvent.type(firstTextInputInNinthRow, '{shift}{enter}');

          firstTextInputInEighthRow = screen.getByDisplayValue('8');
          expect(firstTextInputInEighthRow).toHaveFocus();

          userEvent.type(firstTextInputInEighthRow, '{shift}{enter}');

          firstTextInputInSeventhRow = screen.getByDisplayValue('7');
          expect(firstTextInputInSeventhRow).toHaveFocus();

          userEvent.type(firstTextInputInSeventhRow, '{shift}{enter}');

          firstTextInputInSixthRow = screen.getByDisplayValue('6');
          expect(firstTextInputInSixthRow).toHaveFocus();

          userEvent.type(firstTextInputInSixthRow, '{shift}{enter}');

          firstTextInputInFifthRow = screen.getByDisplayValue('5');
          expect(firstTextInputInFifthRow).toHaveFocus();

          userEvent.type(firstTextInputInFifthRow, '{shift}{enter}');

          firstTextInputInFourthRow = screen.getByDisplayValue('4');
          expect(firstTextInputInFourthRow).toHaveFocus();

          userEvent.type(firstTextInputInFourthRow, '{shift}{enter}');

          firstTextInputInThirdRow = screen.getByDisplayValue('3');
          expect(firstTextInputInThirdRow).toHaveFocus();

          userEvent.type(firstTextInputInThirdRow, '{shift}{enter}');

          firstTextInputInSecondRow = screen.getByDisplayValue('2');
          expect(firstTextInputInSecondRow).toHaveFocus();

          userEvent.type(firstTextInputInSecondRow, '{shift}{enter}');

          firstTextInputInFirstRow = screen.getByDisplayValue('1');
          expect(firstTextInputInFirstRow).toHaveFocus();
        });

        it('leaves Edit Mode when the user presses Shift+Enter on any cell in the first row', () => {
          render(<BasicEditableTable tableData={basicPokemonData} />);
          enterEditMode();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.type(firstTextInputInFirstRow, '{shift}{enter}');

          expect(document.body).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });
      });

      describe('Escape key', () => {
        it('leaves Edit Mode when the user presses Escape', () => {
          render(<BasicEditableTable tableData={basicPokemonData} />);
          enterEditMode();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.type(firstTextInputInFirstRow, '{escape}');

          const firstCellInTable = screen.getByRole('button', {
            name: '1 - Press Enter to edit',
          });

          expect(firstCellInTable).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });
      });

      describe('Outside click', () => {
        it('leaves Edit Mode when the user clicks anywhere outside of the table', () => {
          render(<BasicEditableTable tableData={basicPokemonData} />);
          enterEditMode();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.click(document.body);

          expect(document.body).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });
      });
    });
  });
});
