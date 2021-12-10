import React, { forwardRef } from 'react';

const _TableCellCheckbox = ({ tableCellData, ...restProps }, ref) => (
  <input
    type="checkbox"
    aria-label={tableCellData['aria-label']}
    {...restProps}
    ref={ref}
  />
);

export const TableCellCheckbox = forwardRef(_TableCellCheckbox);
