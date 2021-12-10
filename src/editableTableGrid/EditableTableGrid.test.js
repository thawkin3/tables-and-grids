import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditableTableGrid } from './EditableTableGrid';
import { pokemonDataWithWidgetTypes } from '../fixtures/pokemonDataWithWidgetTypes';

describe('EditableTableGrid', () => {
  it('renders a table element with a "grid" role', () => {
    render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);

    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('renders a table header with the appropriate data', () => {
    const { container } = render(
      <EditableTableGrid tableData={pokemonDataWithWidgetTypes} />
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
      <EditableTableGrid tableData={pokemonDataWithWidgetTypes} />
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
    it('renders each table cell as a button, except for the table cell that contains the checkbox', () => {
      render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);

      const tableHeaders = Object.keys(pokemonDataWithWidgetTypes[0]);
      const numberOfColumns = tableHeaders.length;
      const numberOfRows = pokemonDataWithWidgetTypes.length;
      const numberOfCheckboxes = numberOfRows;
      const numberOfTableBodyCells = numberOfColumns * numberOfRows;
      const numberOfTableBodyCellButtons =
        numberOfTableBodyCells - numberOfCheckboxes;

      expect(screen.getAllByRole('cell').length).toBe(numberOfTableBodyCells);
      expect(screen.getAllByRole('button').length).toBe(
        numberOfTableBodyCellButtons
      );
    });

    it('includes an aria-label for each table cell button to instruct screen reader users how to enter Edit Mode', () => {
      render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);

      expect(
        screen.getByRole('button', { name: '1 - Press Enter to edit' })
      ).toBeInTheDocument();
    });

    it('allows the user to tab to the grid but to not the content inside it', () => {
      render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);

      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(screen.getByRole('grid')).toHaveFocus();

      userEvent.tab();
      expect(document.body).toHaveFocus();
    });

    it('allows the user to tab to the grid and then use any arrow key to navigate to the top-left grid cell', () => {
      render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);

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
      render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);

      const grid = screen.getByRole('grid');

      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(grid).toHaveFocus();

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      expect(
        screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
      ).toHaveFocus();

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      expect(
        screen.getByRole('button', { name: '1 - Press Enter to edit' })
      ).toHaveFocus();

      userEvent.type(grid, '{arrowdown}', { skipClick: true });
      expect(
        screen.getByRole('button', { name: '2 - Press Enter to edit' })
      ).toHaveFocus();

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
      render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);

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
        screen.getAllByRole('button', {
          name: 'One of the three starter Pokémon - Press Enter to edit',
        })[0]
      ).toHaveFocus();
    });

    it('allows the user to navigate to the last cell in the last row using the Control+End keys', () => {
      render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);

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
        screen.getByRole('button', {
          name: 'Evolves from Wartortle - Press Enter to edit',
        })
      ).toHaveFocus();
    });

    it('allows the user to navigate to the first cell in the current row using the Home key', () => {
      render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);

      const grid = screen.getByRole('grid');

      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(grid).toHaveFocus();

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      expect(
        screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
      ).toHaveFocus();

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      expect(
        screen.getByRole('button', { name: '1 - Press Enter to edit' })
      ).toHaveFocus();

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      // TODO: Need to figure out where the focus should go, on the cell or on the link
      // expect(screen.getByRole('link', { name: 'Bulbasaur' })).toHaveFocus();
      expect(
        screen.getByRole('button', { name: 'Bulbasaur - Press Enter to edit' })
      ).toHaveFocus();

      userEvent.type(grid, '{arrowdown}', { skipClick: true });
      // TODO: Need to figure out where the focus should go, on the cell or on the link
      // expect(screen.getByRole('link', { name: 'Ivysaur' })).toHaveFocus();
      expect(
        screen.getByRole('button', { name: 'Ivysaur - Press Enter to edit' })
      ).toHaveFocus();

      userEvent.type(grid, '{home}', { skipClick: true });
      expect(
        screen.getByRole('checkbox', { name: 'Select Row - Ivysaur' })
      ).toHaveFocus();
    });

    it('allows the user to navigate to the first cell in the first row using the Control+Home keys', () => {
      render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);

      const grid = screen.getByRole('grid');

      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(grid).toHaveFocus();

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      expect(
        screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
      ).toHaveFocus();

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      expect(
        screen.getByRole('button', { name: '1 - Press Enter to edit' })
      ).toHaveFocus();

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      // TODO: Need to figure out where the focus should go, on the cell or on the link
      // expect(screen.getByRole('link', { name: 'Bulbasaur' })).toHaveFocus();
      expect(
        screen.getByRole('button', { name: 'Bulbasaur - Press Enter to edit' })
      ).toHaveFocus();

      userEvent.type(grid, '{arrowdown}', { skipClick: true });
      // TODO: Need to figure out where the focus should go, on the cell or on the link
      // expect(screen.getByRole('link', { name: 'Ivysaur' })).toHaveFocus();
      expect(
        screen.getByRole('button', { name: 'Ivysaur - Press Enter to edit' })
      ).toHaveFocus();

      userEvent.type(grid, '{ctrl}{home}', { skipClick: true });
      expect(
        screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
      ).toHaveFocus();
    });

    it('does not wrap navigation of the grid from the end of one row to the beginning of the next', () => {
      render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);

      const grid = screen.getByRole('grid');

      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(grid).toHaveFocus();

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      expect(
        screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
      ).toHaveFocus();

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      expect(
        screen.getByRole('button', { name: '1 - Press Enter to edit' })
      ).toHaveFocus();

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      // TODO: Need to figure out where the focus should go, on the cell or on the link
      // expect(screen.getByRole('link', { name: 'Bulbasaur' })).toHaveFocus();
      expect(
        screen.getByRole('button', { name: 'Bulbasaur - Press Enter to edit' })
      ).toHaveFocus();

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      expect(
        screen.getAllByRole('button', {
          name: 'Grass - Press Enter to edit',
        })[0]
      ).toHaveFocus();

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      expect(
        screen.getAllByRole('button', {
          name: 'One of the three starter Pokémon - Press Enter to edit',
        })[0]
      ).toHaveFocus();

      // Focus does not move because you are already on the right border of the grid
      userEvent.type(grid, '{arrowright}', { skipClick: true });
      expect(
        screen.getAllByRole('button', {
          name: 'One of the three starter Pokémon - Press Enter to edit',
        })[0]
      ).toHaveFocus();
    });

    it('sets the focus to the clicked cell (or widget within the cell) when a user uses a mouse to click any given cell', () => {
      const { container } = render(
        <EditableTableGrid tableData={pokemonDataWithWidgetTypes} />
      );

      const gridCells = container.querySelectorAll('td');
      const firstCheckboxCell = gridCells[0];

      // Focus is set to the checkbox itself, not the cell containing the checkbox
      const checkboxInFirstCell = screen.getByRole('checkbox', {
        name: 'Select Row - Bulbasaur',
      });
      userEvent.click(firstCheckboxCell);
      expect(checkboxInFirstCell).toHaveFocus();

      // Focus is set to the cell button containing the text
      const textCellButton = screen.getByRole('button', {
        name: '1 - Press Enter to edit',
      });
      userEvent.click(textCellButton);
      expect(textCellButton).toHaveFocus();

      // TODO: Need to figure out where the focus should go, on the cell or on the link
      // const linkWithinFirstLinkCell = screen.getByRole('link', {
      //   name: 'Bulbasaur',
      // });
      const linkCellButton = screen.getByRole('button', {
        name: 'Bulbasaur - Press Enter to edit',
      });
      userEvent.click(linkCellButton);
      expect(linkCellButton).toHaveFocus();
    });

    it("allows the user to press Enter on any cell to enter Edit Mode for that cell's row", () => {
      render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);

      const grid = screen.getByRole('grid');

      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(grid).toHaveFocus();

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      expect(
        screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
      ).toHaveFocus();

      const firstButtonCellInTable = screen.getByRole('button', {
        name: '1 - Press Enter to edit',
      });

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      expect(firstButtonCellInTable).toHaveFocus();

      userEvent.type(firstButtonCellInTable, '{enter}');

      const tableHeaders = Object.keys(pokemonDataWithWidgetTypes[0]);
      const numberOfColumns = tableHeaders.length;
      const numberOfRows = pokemonDataWithWidgetTypes.length;
      const numberOfCheckboxes = numberOfRows;
      const numberOfTableBodyCells = numberOfColumns * numberOfRows;
      const numberOfTableBodyCellButtons =
        numberOfTableBodyCells - numberOfCheckboxes;

      // The current row's cells should be in Edit Mode as text inputs (except for the checkbox cell),
      // and the rest of the rows' cells should still be in View Mode as buttons (except for the checkbox cells)
      const numberOfTextInputsInEditMode = numberOfColumns - 1;
      const numberOfRemainingTableBodyCellButtonsWhenInEditMode =
        numberOfTableBodyCellButtons - numberOfTextInputsInEditMode;

      expect(screen.getAllByRole('textbox').length).toBe(
        numberOfTextInputsInEditMode
      );
      expect(screen.getAllByRole('button').length).toBe(
        numberOfRemainingTableBodyCellButtonsWhenInEditMode
      );
    });

    it('does not enter Edit Mode on keypresses for any key other than Enter', () => {
      render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);

      const grid = screen.getByRole('grid');

      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(grid).toHaveFocus();

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      expect(
        screen.getByRole('checkbox', { name: 'Select Row - Bulbasaur' })
      ).toHaveFocus();

      const firstButtonCellInTable = screen.getByRole('button', {
        name: '1 - Press Enter to edit',
      });

      userEvent.type(grid, '{arrowright}', { skipClick: true });
      expect(firstButtonCellInTable).toHaveFocus();

      fireEvent.keyPress(firstButtonCellInTable, {
        key: 'a',
        code: 'KeyA',
        keyCode: 97,
        charCode: 97,
      });

      expect(screen.queryAllByRole('textbox').length).toBe(0);
    });

    it("allows the user to double click on any cell to enter Edit Mode for that cell's row", () => {
      render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);

      const firstCellInTable = screen.getByRole('button', {
        name: '1 - Press Enter to edit',
      });

      userEvent.dblClick(firstCellInTable);

      const tableHeaders = Object.keys(pokemonDataWithWidgetTypes[0]);
      const numberOfColumns = tableHeaders.length;
      const numberOfRows = pokemonDataWithWidgetTypes.length;
      const numberOfCheckboxes = numberOfRows;
      const numberOfTableBodyCells = numberOfColumns * numberOfRows;
      const numberOfTableBodyCellButtons =
        numberOfTableBodyCells - numberOfCheckboxes;

      // The current row's cells should be in Edit Mode as text inputs (except for the checkbox cell),
      // and the rest of the rows' cells should still be in View Mode as buttons (except for the checkbox cells)
      const numberOfTextInputsInEditMode = numberOfColumns - 1;
      const numberOfRemainingTableBodyCellButtonsWhenInEditMode =
        numberOfTableBodyCellButtons - numberOfTextInputsInEditMode;

      expect(screen.getAllByRole('textbox').length).toBe(
        numberOfTextInputsInEditMode
      );
      expect(screen.getAllByRole('button').length).toBe(
        numberOfRemainingTableBodyCellButtonsWhenInEditMode
      );
    });
  });

  describe('Edit Mode', () => {
    const enterEditMode = () => {
      const firstButtonCellInTable = screen.getByRole('button', {
        name: '1 - Press Enter to edit',
      });

      userEvent.tab();
      userEvent.tab();
      userEvent.type(firstButtonCellInTable, '{enter}');
    };

    describe('table navigation', () => {
      describe('Tab key', () => {
        it('moves focus right by one cell when the user presses Tab', () => {
          render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);
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
          render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);
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

          const checkboxInputInSecondRow = screen.getByRole('checkbox', {
            name: 'Select Row - Ivysaur',
          });
          expect(checkboxInputInSecondRow).toHaveFocus();
        });

        it('leaves Edit Mode when the user presses Tab on the last cell in the last row', () => {
          render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);
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
          render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);
          enterEditMode();

          const checkboxInputInFirstRow = screen.getByRole('checkbox', {
            name: 'Select Row - Bulbasaur',
          });
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

          userEvent.tab({ shift: true });
          expect(checkboxInputInFirstRow).toHaveFocus();
        });

        it('moves focus to the last cell in the previous row when the user presses Shift+Tab on the first cell in a row', () => {
          render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);
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

          const checkboxInputInSecondRow = screen.getByRole('checkbox', {
            name: 'Select Row - Ivysaur',
          });
          expect(checkboxInputInSecondRow).toHaveFocus();

          userEvent.tab({ shift: true });

          fourthTextInputInFirstRow = screen.getAllByDisplayValue(
            'One of the three starter Pokémon'
          )[0];
          expect(fourthTextInputInFirstRow).toHaveFocus();
        });

        it('leaves Edit Mode when the user presses Shift+Tab on the first cell in the first row', () => {
          render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);
          enterEditMode();

          userEvent.tab({ shift: true });

          const checkboxInputInFirstRow = screen.getByRole('checkbox', {
            name: 'Select Row - Bulbasaur',
          });

          expect(checkboxInputInFirstRow).toHaveFocus();

          userEvent.tab({ shift: true });
          expect(screen.getByRole('grid')).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });
      });

      describe('Enter key', () => {
        it('moves focus down by one cell when the user presses Enter', () => {
          render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);
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
          render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);
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
          render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);
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

          let firstTextInputInNinthRow = screen.getByDisplayValue('9');
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
          render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);
          enterEditMode();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.type(firstTextInputInFirstRow, '{shift}{enter}');

          expect(document.body).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });
      });

      describe('Escape key', () => {
        it('leaves Edit Mode when the user presses Escape when focused on an editable input', () => {
          render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);
          enterEditMode();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.type(firstTextInputInFirstRow, '{escape}');

          const firstButtonCellInTable = screen.getByRole('button', {
            name: '1 - Press Enter to edit',
          });

          expect(firstButtonCellInTable).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });

        it('leaves Edit Mode when the user presses Escape when focused somewhere else on the table grid', () => {
          render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);
          enterEditMode();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          expect(firstTextInputInFirstRow).toHaveFocus();

          const idCellButtonInSecondRow = screen.getByRole('button', {
            name: '2 - Press Enter to edit',
          });

          userEvent.click(idCellButtonInSecondRow);
          expect(firstTextInputInFirstRow).toBeInTheDocument();

          userEvent.type(idCellButtonInSecondRow, '{escape}');

          expect(idCellButtonInSecondRow).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });
      });

      describe('Outside click', () => {
        it('leaves Edit Mode when the user clicks anywhere outside of the table', () => {
          render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);
          enterEditMode();

          const firstTextInputInFirstRow = screen.getByDisplayValue('1');
          expect(firstTextInputInFirstRow).toHaveFocus();

          userEvent.click(document.body);

          expect(document.body).toHaveFocus();
          expect(screen.queryAllByRole('textbox').length).toBe(0);
        });
      });

      describe('Making changes to the data', () => {
        it("saves changes to a cell's data when the user presses the Tab key", () => {
          render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);
          enterEditMode();

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
          render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);
          enterEditMode();

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
          render(<EditableTableGrid tableData={pokemonDataWithWidgetTypes} />);
          enterEditMode();

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
