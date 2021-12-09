import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditableTableWithWidgetTypes } from './EditableTableWithWidgetTypes';
import { pokemonDataWithWidgetTypes } from '../fixtures/pokemonDataWithWidgetTypes';

describe('EditableTableWithWidgetTypes', () => {
  it('renders a table element', () => {
    render(
      <EditableTableWithWidgetTypes tableData={pokemonDataWithWidgetTypes} />
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders a table header with the appropriate data', () => {
    const { container } = render(
      <EditableTableWithWidgetTypes tableData={pokemonDataWithWidgetTypes} />
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
      <EditableTableWithWidgetTypes tableData={pokemonDataWithWidgetTypes} />
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

  describe('View Mode', () => {
    it('renders each table cell as a button', () => {
      render(
        <EditableTableWithWidgetTypes tableData={pokemonDataWithWidgetTypes} />
      );

      const tableHeaders = Object.keys(pokemonDataWithWidgetTypes[0]);
      const numberOfColumns = tableHeaders.length;
      const numberOfRows = pokemonDataWithWidgetTypes.length;
      const numberOfTableBodyCells = numberOfColumns * numberOfRows;

      expect(screen.getAllByRole('button').length).toBe(numberOfTableBodyCells);
    });

    it('includes an aria-label for each table cell button to instruct screen reader users how to enter Edit Mode', () => {
      render(
        <EditableTableWithWidgetTypes tableData={pokemonDataWithWidgetTypes} />
      );

      expect(
        screen.getByRole('button', { name: '1 - Press Enter to edit' })
      ).toBeInTheDocument();
    });

    it('allows the user to tab to each cell in the table', () => {
      render(
        <EditableTableWithWidgetTypes tableData={pokemonDataWithWidgetTypes} />
      );

      expect(document.body).toHaveFocus();

      // TODO: Should there be a tab stop on both the table cell and the checkbox?
      // Probably not. The tab stop should just be on the checkbox, not the table cell.
      userEvent.tab();
      expect(
        screen.getByRole('button', {
          name: 'Select Row - Bulbasaur - Press Enter to edit',
        })
      ).toHaveFocus();

      userEvent.tab();
      expect(
        screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
      ).toHaveFocus();

      userEvent.tab();
      expect(
        screen.getByRole('button', { name: '1 - Press Enter to edit' })
      ).toHaveFocus();

      userEvent.tab();
      expect(
        screen.getByRole('button', { name: 'Bulbasaur - Press Enter to edit' })
      ).toHaveFocus();

      userEvent.tab();
      expect(screen.getByRole('link', { name: 'Bulbasaur' })).toHaveFocus();

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

      // TODO: Should there be a tab stop on both the table cell and the checkbox?
      // Probably not. The tab stop should just be on the checkbox, not the table cell.
      userEvent.tab();
      expect(
        screen.getByRole('button', {
          name: 'Select Row - Ivysaur - Press Enter to edit',
        })
      ).toHaveFocus();

      userEvent.tab();
      expect(
        screen.getByRole('checkbox', { name: 'Select Row - Ivysaur' })
      ).toHaveFocus();
    });

    it("allows the user to press Enter on any cell to enter Edit Mode for that cell's row", () => {
      render(
        <EditableTableWithWidgetTypes tableData={pokemonDataWithWidgetTypes} />
      );

      expect(document.body).toHaveFocus();

      // TODO: Should there be a tab stop on both the table cell and the checkbox?
      // Probably not. The tab stop should just be on the checkbox, not the table cell.
      const firstCellInTable = screen.getByRole('button', {
        name: 'Select Row - Bulbasaur - Press Enter to edit',
      });

      userEvent.tab();
      expect(firstCellInTable).toHaveFocus();

      userEvent.type(firstCellInTable, '{enter}');

      const tableHeaders = Object.keys(pokemonDataWithWidgetTypes[0]);
      const numberOfColumns = tableHeaders.length;
      const numberOfRows = pokemonDataWithWidgetTypes.length;
      const numberOfTableBodyCells = numberOfColumns * numberOfRows;

      // The current row's cells should be in Edit Mode as text inputs,
      // and the rest of the rows' cells should still be in View Mode as buttons
      expect(screen.getAllByRole('textbox').length).toBe(numberOfColumns);
      expect(screen.getAllByRole('button').length).toBe(
        numberOfTableBodyCells - numberOfColumns
      );
    });

    it('does not enter Edit Mode on keypresses for any key other than Enter', () => {
      render(
        <EditableTableWithWidgetTypes tableData={pokemonDataWithWidgetTypes} />
      );

      expect(document.body).toHaveFocus();

      // TODO: Should there be a tab stop on both the table cell and the checkbox?
      // Probably not. The tab stop should just be on the checkbox, not the table cell.
      const firstCellInTable = screen.getByRole('button', {
        name: 'Select Row - Bulbasaur - Press Enter to edit',
      });

      userEvent.tab();
      expect(firstCellInTable).toHaveFocus();

      fireEvent.keyPress(firstCellInTable, {
        key: 'a',
        code: 'KeyA',
        keyCode: 97,
        charCode: 97,
      });

      expect(screen.queryAllByRole('textbox').length).toBe(0);
    });

    it("allows the user to double click on any cell to enter Edit Mode for that cell's row", () => {
      render(
        <EditableTableWithWidgetTypes tableData={pokemonDataWithWidgetTypes} />
      );

      const firstCellInTable = screen.getByRole('button', {
        name: '1 - Press Enter to edit',
      });

      userEvent.dblClick(firstCellInTable);

      const tableHeaders = Object.keys(pokemonDataWithWidgetTypes[0]);
      const numberOfColumns = tableHeaders.length;
      const numberOfRows = pokemonDataWithWidgetTypes.length;
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
      // TODO: Should there be a tab stop on both the table cell and the checkbox?
      // Probably not. The tab stop should just be on the checkbox, not the table cell.
      const firstCellInTable = screen.getByRole('button', {
        name: 'Select Row - Bulbasaur - Press Enter to edit',
      });

      userEvent.tab();

      userEvent.type(firstCellInTable, '{enter}');
    };

    describe('table navigation', () => {
      describe('Tab key', () => {
        it('moves focus right by one cell when the user presses Tab', () => {
          render(
            <EditableTableWithWidgetTypes
              tableData={pokemonDataWithWidgetTypes}
            />
          );
          enterEditMode();

          // TODO: The checkbox shouldn't turn into a text input when in Edit Mode
          const checkboxInputInFirstRow = screen.getByDisplayValue(
            'Select Row - Bulbasaur'
          );
          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          const secondTextInputInFirstRow =
            screen.getByDisplayValue('Bulbasaur');
          const thirdTextInputInFirstRow =
            screen.getAllByDisplayValue('Grass')[0];
          const fourthTextInputInFirstRow = screen.getAllByDisplayValue(
            'One of the three starter Pokémon'
          )[0];

          expect(checkboxInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(secondTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(thirdTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(fourthTextInputInFirstRow).toHaveFocus();
        });

        it('moves focus to the first cell in the next row when the user presses Tab on the last cell in a row', () => {
          render(
            <EditableTableWithWidgetTypes
              tableData={pokemonDataWithWidgetTypes}
            />
          );
          enterEditMode();

          // TODO: The checkbox shouldn't turn into a text input when in Edit Mode
          const checkboxInputInFirstRow = screen.getByDisplayValue(
            'Select Row - Bulbasaur'
          );
          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          const secondTextInputInFirstRow =
            screen.getByDisplayValue('Bulbasaur');
          const thirdTextInputInFirstRow =
            screen.getAllByDisplayValue('Grass')[0];
          const fourthTextInputInFirstRow = screen.getAllByDisplayValue(
            'One of the three starter Pokémon'
          )[0];

          expect(checkboxInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(secondTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(thirdTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(fourthTextInputInFirstRow).toHaveFocus();

          userEvent.tab();

          const checkboxInputInSecondRow = screen.getByDisplayValue(
            'Select Row - Ivysaur'
          );
          expect(checkboxInputInSecondRow).toHaveFocus();
        });

        it('leaves Edit Mode when the user presses Tab on the last cell in the last row', () => {
          render(
            <EditableTableWithWidgetTypes
              tableData={pokemonDataWithWidgetTypes}
            />
          );
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
          render(
            <EditableTableWithWidgetTypes
              tableData={pokemonDataWithWidgetTypes}
            />
          );
          enterEditMode();

          // TODO: The checkbox shouldn't turn into a text input when in Edit Mode
          const checkboxInputInFirstRow = screen.getByDisplayValue(
            'Select Row - Bulbasaur'
          );
          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          const secondTextInputInFirstRow =
            screen.getByDisplayValue('Bulbasaur');
          const thirdTextInputInFirstRow =
            screen.getAllByDisplayValue('Grass')[0];
          const fourthTextInputInFirstRow = screen.getAllByDisplayValue(
            'One of the three starter Pokémon'
          )[0];

          expect(checkboxInputInFirstRow).toHaveFocus();

          userEvent.tab();
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

          userEvent.tab({ shift: true });
          expect(checkboxInputInFirstRow).toHaveFocus();
        });

        it('moves focus to the last cell in the previous row when the user presses Shift+Tab on the first cell in a row', () => {
          render(
            <EditableTableWithWidgetTypes
              tableData={pokemonDataWithWidgetTypes}
            />
          );
          enterEditMode();

          // TODO: The checkbox shouldn't turn into a text input when in Edit Mode
          const checkboxInputInFirstRow = screen.getByDisplayValue(
            'Select Row - Bulbasaur'
          );
          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          const secondTextInputInFirstRow =
            screen.getByDisplayValue('Bulbasaur');
          const thirdTextInputInFirstRow =
            screen.getAllByDisplayValue('Grass')[0];
          let fourthTextInputInFirstRow = screen.getAllByDisplayValue(
            'One of the three starter Pokémon'
          )[0];

          expect(checkboxInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(secondTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(thirdTextInputInFirstRow).toHaveFocus();

          userEvent.tab();
          expect(fourthTextInputInFirstRow).toHaveFocus();

          userEvent.tab();

          const checkboxInputInSecondRow = screen.getByDisplayValue(
            'Select Row - Ivysaur'
          );
          expect(checkboxInputInSecondRow).toHaveFocus();

          userEvent.tab({ shift: true });

          fourthTextInputInFirstRow = screen.getAllByDisplayValue(
            'One of the three starter Pokémon'
          )[0];
          expect(fourthTextInputInFirstRow).toHaveFocus();
        });

        it('leaves Edit Mode when the user presses Shift+Tab on the first cell in the first row', () => {
          render(
            <EditableTableWithWidgetTypes
              tableData={pokemonDataWithWidgetTypes}
            />
          );
          enterEditMode();

          // TODO: The checkbox shouldn't turn into a text input when in Edit Mode
          const checkboxInputInFirstRow = screen.getByDisplayValue(
            'Select Row - Bulbasaur'
          );

          expect(checkboxInputInFirstRow).toHaveFocus();

          userEvent.tab({ shift: true });
          expect(document.body).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });
      });

      describe('Enter key', () => {
        it('moves focus down by one cell when the user presses Enter', () => {
          render(
            <EditableTableWithWidgetTypes
              tableData={pokemonDataWithWidgetTypes}
            />
          );
          enterEditMode();

          // TODO: The checkbox shouldn't turn into a text input when in Edit Mode
          const checkboxInputInFirstRow = screen.getByDisplayValue(
            'Select Row - Bulbasaur'
          );
          expect(checkboxInputInFirstRow).toHaveFocus();

          userEvent.type(checkboxInputInFirstRow, '{enter}');

          const checkboxInputInSecondRow = screen.getByDisplayValue(
            'Select Row - Ivysaur'
          );
          expect(checkboxInputInSecondRow).toHaveFocus();

          userEvent.type(checkboxInputInSecondRow, '{enter}');

          const checkboxInputInThirdRow = screen.getByDisplayValue(
            'Select Row - Venusaur'
          );
          expect(checkboxInputInThirdRow).toHaveFocus();

          userEvent.type(checkboxInputInThirdRow, '{enter}');

          const checkboxInputInFourthRow = screen.getByDisplayValue(
            'Select Row - Charmander'
          );
          expect(checkboxInputInFourthRow).toHaveFocus();

          userEvent.type(checkboxInputInFourthRow, '{enter}');

          const checkboxInputInFifthRow = screen.getByDisplayValue(
            'Select Row - Charmeleon'
          );
          expect(checkboxInputInFifthRow).toHaveFocus();

          userEvent.type(checkboxInputInFifthRow, '{enter}');

          const checkboxInputInSixthRow = screen.getByDisplayValue(
            'Select Row - Charizard'
          );
          expect(checkboxInputInSixthRow).toHaveFocus();

          userEvent.type(checkboxInputInSixthRow, '{enter}');

          const checkboxInputInSeventhRow = screen.getByDisplayValue(
            'Select Row - Squirtle'
          );
          expect(checkboxInputInSeventhRow).toHaveFocus();

          userEvent.type(checkboxInputInSeventhRow, '{enter}');

          const checkboxInputInEighthRow = screen.getByDisplayValue(
            'Select Row - Wartortle'
          );
          expect(checkboxInputInEighthRow).toHaveFocus();

          userEvent.type(checkboxInputInEighthRow, '{enter}');

          const checkboxInputInNinthRow = screen.getByDisplayValue(
            'Select Row - Blastoise'
          );
          expect(checkboxInputInNinthRow).toHaveFocus();
        });

        it('leaves Edit Mode when the user presses Enter on any cell in the last row', () => {
          render(
            <EditableTableWithWidgetTypes
              tableData={pokemonDataWithWidgetTypes}
            />
          );
          enterEditMode();

          // TODO: The checkbox shouldn't turn into a text input when in Edit Mode
          const checkboxInputInFirstRow = screen.getByDisplayValue(
            'Select Row - Bulbasaur'
          );
          expect(checkboxInputInFirstRow).toHaveFocus();

          userEvent.type(checkboxInputInFirstRow, '{enter}');

          const checkboxInputInSecondRow = screen.getByDisplayValue(
            'Select Row - Ivysaur'
          );
          expect(checkboxInputInSecondRow).toHaveFocus();

          userEvent.type(checkboxInputInSecondRow, '{enter}');

          const checkboxInputInThirdRow = screen.getByDisplayValue(
            'Select Row - Venusaur'
          );
          expect(checkboxInputInThirdRow).toHaveFocus();

          userEvent.type(checkboxInputInThirdRow, '{enter}');

          const checkboxInputInFourthRow = screen.getByDisplayValue(
            'Select Row - Charmander'
          );
          expect(checkboxInputInFourthRow).toHaveFocus();

          userEvent.type(checkboxInputInFourthRow, '{enter}');

          const checkboxInputInFifthRow = screen.getByDisplayValue(
            'Select Row - Charmeleon'
          );
          expect(checkboxInputInFifthRow).toHaveFocus();

          userEvent.type(checkboxInputInFifthRow, '{enter}');

          const checkboxInputInSixthRow = screen.getByDisplayValue(
            'Select Row - Charizard'
          );
          expect(checkboxInputInSixthRow).toHaveFocus();

          userEvent.type(checkboxInputInSixthRow, '{enter}');

          const checkboxInputInSeventhRow = screen.getByDisplayValue(
            'Select Row - Squirtle'
          );
          expect(checkboxInputInSeventhRow).toHaveFocus();

          userEvent.type(checkboxInputInSeventhRow, '{enter}');

          const checkboxInputInEighthRow = screen.getByDisplayValue(
            'Select Row - Wartortle'
          );
          expect(checkboxInputInEighthRow).toHaveFocus();

          userEvent.type(checkboxInputInEighthRow, '{enter}');

          const checkboxInputInNinthRow = screen.getByDisplayValue(
            'Select Row - Blastoise'
          );
          expect(checkboxInputInNinthRow).toHaveFocus();

          userEvent.type(checkboxInputInNinthRow, '{enter}');

          expect(document.body).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });

        it('moves focus up by one cell when the user presses Shift+Enter', () => {
          render(
            <EditableTableWithWidgetTypes
              tableData={pokemonDataWithWidgetTypes}
            />
          );
          enterEditMode();

          // TODO: The checkbox shouldn't turn into a text input when in Edit Mode
          let checkboxInputInFirstRow = screen.getByDisplayValue(
            'Select Row - Bulbasaur'
          );
          expect(checkboxInputInFirstRow).toHaveFocus();

          userEvent.type(checkboxInputInFirstRow, '{enter}');

          let checkboxInputInSecondRow = screen.getByDisplayValue(
            'Select Row - Ivysaur'
          );
          expect(checkboxInputInSecondRow).toHaveFocus();

          userEvent.type(checkboxInputInSecondRow, '{enter}');

          let checkboxInputInThirdRow = screen.getByDisplayValue(
            'Select Row - Venusaur'
          );
          expect(checkboxInputInThirdRow).toHaveFocus();

          userEvent.type(checkboxInputInThirdRow, '{enter}');

          let checkboxInputInFourthRow = screen.getByDisplayValue(
            'Select Row - Charmander'
          );
          expect(checkboxInputInFourthRow).toHaveFocus();

          userEvent.type(checkboxInputInFourthRow, '{enter}');

          let checkboxInputInFifthRow = screen.getByDisplayValue(
            'Select Row - Charmeleon'
          );
          expect(checkboxInputInFifthRow).toHaveFocus();

          userEvent.type(checkboxInputInFifthRow, '{enter}');

          let checkboxInputInSixthRow = screen.getByDisplayValue(
            'Select Row - Charizard'
          );
          expect(checkboxInputInSixthRow).toHaveFocus();

          userEvent.type(checkboxInputInSixthRow, '{enter}');

          let checkboxInputInSeventhRow = screen.getByDisplayValue(
            'Select Row - Squirtle'
          );
          expect(checkboxInputInSeventhRow).toHaveFocus();

          userEvent.type(checkboxInputInSeventhRow, '{enter}');

          let checkboxInputInEighthRow = screen.getByDisplayValue(
            'Select Row - Wartortle'
          );
          expect(checkboxInputInEighthRow).toHaveFocus();

          userEvent.type(checkboxInputInEighthRow, '{enter}');

          let checkboxInputInNinthRow = screen.getByDisplayValue(
            'Select Row - Blastoise'
          );
          expect(checkboxInputInNinthRow).toHaveFocus();

          userEvent.type(checkboxInputInNinthRow, '{shift}{enter}');

          checkboxInputInEighthRow = screen.getByDisplayValue(
            'Select Row - Wartortle'
          );
          expect(checkboxInputInEighthRow).toHaveFocus();

          userEvent.type(checkboxInputInEighthRow, '{shift}{enter}');

          checkboxInputInSeventhRow = screen.getByDisplayValue(
            'Select Row - Squirtle'
          );
          expect(checkboxInputInSeventhRow).toHaveFocus();

          userEvent.type(checkboxInputInSeventhRow, '{shift}{enter}');

          checkboxInputInSixthRow = screen.getByDisplayValue(
            'Select Row - Charizard'
          );
          expect(checkboxInputInSixthRow).toHaveFocus();

          userEvent.type(checkboxInputInSixthRow, '{shift}{enter}');

          checkboxInputInFifthRow = screen.getByDisplayValue(
            'Select Row - Charmeleon'
          );
          expect(checkboxInputInFifthRow).toHaveFocus();

          userEvent.type(checkboxInputInFifthRow, '{shift}{enter}');

          checkboxInputInFourthRow = screen.getByDisplayValue(
            'Select Row - Charmander'
          );
          expect(checkboxInputInFourthRow).toHaveFocus();

          userEvent.type(checkboxInputInFourthRow, '{shift}{enter}');

          checkboxInputInThirdRow = screen.getByDisplayValue(
            'Select Row - Venusaur'
          );
          expect(checkboxInputInThirdRow).toHaveFocus();

          userEvent.type(checkboxInputInThirdRow, '{shift}{enter}');

          checkboxInputInSecondRow = screen.getByDisplayValue(
            'Select Row - Ivysaur'
          );
          expect(checkboxInputInSecondRow).toHaveFocus();

          userEvent.type(checkboxInputInSecondRow, '{shift}{enter}');

          checkboxInputInFirstRow = screen.getByDisplayValue(
            'Select Row - Bulbasaur'
          );
          expect(checkboxInputInFirstRow).toHaveFocus();
        });

        it('leaves Edit Mode when the user presses Shift+Enter on any cell in the first row', () => {
          render(
            <EditableTableWithWidgetTypes
              tableData={pokemonDataWithWidgetTypes}
            />
          );
          enterEditMode();

          // TODO: The checkbox shouldn't turn into a text input when in Edit Mode
          const checkboxInputInFirstRow = screen.getByDisplayValue(
            'Select Row - Bulbasaur'
          );
          expect(checkboxInputInFirstRow).toHaveFocus();

          userEvent.type(checkboxInputInFirstRow, '{shift}{enter}');

          expect(document.body).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });
      });

      describe('Escape key', () => {
        it('leaves Edit Mode when the user presses Escape', () => {
          render(
            <EditableTableWithWidgetTypes
              tableData={pokemonDataWithWidgetTypes}
            />
          );
          enterEditMode();

          // TODO: The checkbox shouldn't turn into a text input when in Edit Mode
          const checkboxInputInFirstRow = screen.getByDisplayValue(
            'Select Row - Bulbasaur'
          );
          expect(checkboxInputInFirstRow).toHaveFocus();

          userEvent.type(checkboxInputInFirstRow, '{escape}');

          const firstCellInTable = screen.getByRole('button', {
            name: 'Select Row - Bulbasaur - Press Enter to edit',
          });

          expect(firstCellInTable).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });
      });

      describe('Outside click', () => {
        it('leaves Edit Mode when the user clicks anywhere outside of the table', () => {
          render(
            <EditableTableWithWidgetTypes
              tableData={pokemonDataWithWidgetTypes}
            />
          );
          enterEditMode();

          // TODO: The checkbox shouldn't turn into a text input when in Edit Mode
          const checkboxInputInFirstRow = screen.getByDisplayValue(
            'Select Row - Bulbasaur'
          );
          expect(checkboxInputInFirstRow).toHaveFocus();

          userEvent.type(checkboxInputInFirstRow, '{escape}');

          userEvent.click(document.body);

          expect(document.body).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });
      });

      describe('Making changes to the data', () => {
        it("saves changes to a cell's data when the user presses the Tab key", () => {
          render(
            <EditableTableWithWidgetTypes
              tableData={pokemonDataWithWidgetTypes}
            />
          );
          enterEditMode();

          // TODO: The checkbox shouldn't turn into a text input when in Edit Mode
          const checkboxInputInFirstRow = screen.getByDisplayValue(
            'Select Row - Bulbasaur'
          );
          expect(checkboxInputInFirstRow).toHaveFocus();

          userEvent.tab();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.type(firstTextInputInFirstRow, '23');
          expect(firstTextInputInFirstRow).toHaveValue('123');

          userEvent.tab();
          expect(firstTextInputInFirstRow).toHaveValue('123');

          const secondTextInputInFirstRow =
            screen.getByDisplayValue('Bulbasaur');
          userEvent.type(secondTextInputInFirstRow, '{enter}');

          const firstCellInTable = screen.getByRole('button', {
            name: '123 - Press Enter to edit',
          });
          expect(firstCellInTable).toBeInTheDocument();

          userEvent.click(document.body);

          expect(document.body).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
          expect(firstCellInTable).toBeInTheDocument();
        });

        it("saves changes to a cell's data when the user presses the Enter key", () => {
          render(
            <EditableTableWithWidgetTypes
              tableData={pokemonDataWithWidgetTypes}
            />
          );
          enterEditMode();

          // TODO: The checkbox shouldn't turn into a text input when in Edit Mode
          const checkboxInputInFirstRow = screen.getByDisplayValue(
            'Select Row - Bulbasaur'
          );
          expect(checkboxInputInFirstRow).toHaveFocus();

          userEvent.tab();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.type(firstTextInputInFirstRow, '23');
          expect(firstTextInputInFirstRow).toHaveValue('123');

          userEvent.type(firstTextInputInFirstRow, '{enter}');

          const firstCellInTable = screen.getByRole('button', {
            name: '123 - Press Enter to edit',
          });
          expect(firstCellInTable).toBeInTheDocument();

          userEvent.click(document.body);

          expect(document.body).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
          expect(firstCellInTable).toBeInTheDocument();
        });

        it("does not save changes to a cell's data when the user presses the Escape key", () => {
          render(
            <EditableTableWithWidgetTypes
              tableData={pokemonDataWithWidgetTypes}
            />
          );
          enterEditMode();

          // TODO: The checkbox shouldn't turn into a text input when in Edit Mode
          const checkboxInputInFirstRow = screen.getByDisplayValue(
            'Select Row - Bulbasaur'
          );
          expect(checkboxInputInFirstRow).toHaveFocus();

          userEvent.tab();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.type(firstTextInputInFirstRow, '23 throwaway change');
          expect(firstTextInputInFirstRow).toHaveValue('123 throwaway change');

          userEvent.type(firstTextInputInFirstRow, '{escape}');

          const firstCellInTable = screen.getByRole('button', {
            name: '1 - Press Enter to edit',
          });

          expect(firstCellInTable).toBeInTheDocument();
          expect(firstCellInTable).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });
      });
    });
  });
});
