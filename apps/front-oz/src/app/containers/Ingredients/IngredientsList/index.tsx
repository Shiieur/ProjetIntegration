import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ListRow, ListFooter, ListHeader } from './list';
import { IGetIngredient, IIngredient } from '../../../utils/interfaces';

export type Order = 'asc' | 'desc';

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export interface IIngredientList {
  ingredients: IGetIngredient[];
  setSelectedIngredient: React.Dispatch<React.SetStateAction<IGetIngredient>>;
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  deleteIngredient: (id: number, name?: string) => Promise<void>;
  resetIngredient: () => void;
  onRefresh: () => void;
}

export const IngredientList = ({ ingredients, setPageState, setSelectedIngredient, deleteIngredient, resetIngredient, onRefresh }: IIngredientList) => {
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = ingredients.map((ingredient) => ingredient.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ingredients.length) : 0;

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
            <ListHeader
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={ingredients.length}
              setSelectedIngredient={setSelectedIngredient}
              setPageState={setPageState}
              resetIngredient={resetIngredient}
            />
            <TableBody>
              {ingredients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                // .sort(getComparator(order, orderBy)) @TODO : Handle sorting later
                .map((ingredient, index) => {
                  const isItemSelected = isSelected(ingredient.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <ListRow
                      key={index}
                      handleClick={handleClick}
                      isItemSelected={isItemSelected}
                      labelId={labelId}
                      ingredient={ingredient}
                      setPageState={setPageState}
                      setSelectedIngredient={setSelectedIngredient}
                      deleteIngredient={deleteIngredient}
                    />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <ListFooter handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} page={page} rows={ingredients} rowsPerPage={rowsPerPage} />
      </Paper>
    </Box>
  );
};

export default IngredientList;
