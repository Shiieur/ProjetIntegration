import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { EntityType, IIngredient, IGetIngredient } from '../../../../../utils/interfaces';
import Button from '@mui/material/Button';
import { canSee } from '../../../../../utils/functions';

export interface IHeadCell {
  disablePadding: boolean;
  id: keyof IIngredient;
  label: string;
  numeric: boolean;
}

interface IListHeader {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  setSelectedIngredient: React.Dispatch<React.SetStateAction<IGetIngredient>>;
  resetIngredient: () => void;
}

const IHeadCells: readonly IHeadCell[] = [
  {
    id: 'ingredientId',
    numeric: false,
    disablePadding: false,
    label: 'Id',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nom',
  },
  {
    id: 'image',
    numeric: false,
    disablePadding: false,
    label: 'Image',
  },
  {
    id: 'alcoholic',
    numeric: false,
    disablePadding: false,
    label: 'Alcolisé',
  },
];

export const ListHeader = (props: IListHeader) => {
  const { onSelectAllClick, numSelected, rowCount, setPageState, setSelectedIngredient, resetIngredient } = props;

  return (
    <TableHead>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        onClick={() => {
          setPageState('form');
          resetIngredient();
        }}
      >
        Create
      </Button>
      <TableRow>
        {IHeadCells.map((IHeadCell) => (
          <TableCell key={IHeadCell.id} align={IHeadCell.numeric ? 'right' : 'left'} padding={IHeadCell.disablePadding ? 'none' : 'normal'}>
            <p>{IHeadCell.label}</p>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
