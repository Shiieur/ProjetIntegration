import React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { IGetIngredient } from '../../../../../utils/interfaces';
import { canSee } from 'src/app/utils/functions';
import { Button } from '@mui/material';

export interface IListFooter {
  rows: IGetIngredient[];
  rowsPerPage: number;
  page: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ListFooter = ({ rows, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage }: IListFooter) => {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
