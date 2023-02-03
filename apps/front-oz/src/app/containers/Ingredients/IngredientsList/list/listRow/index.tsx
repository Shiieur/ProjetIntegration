import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import { IIngredient } from '../../../../../utils/interfaces';
import { canSee } from '../../../../../utils/functions';

export interface IRow {
  ingredient: IIngredient;
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void;
  isItemSelected: boolean;
  labelId: string;
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  setSelectedIngredient: React.Dispatch<React.SetStateAction<IIngredient>>;
  deleteIngredient: (id: number, name?: string) => Promise<void>;
  key: number;
}

export const ListRow = ({
  ingredient,
  handleClick,
  isItemSelected,
  labelId,
  setPageState,
  setSelectedIngredient,
  deleteIngredient,
  key,
}: IRow) => {
  const { ingredientId, name, alcoholic, image } = ingredient;

  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, name)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={key}
      selected={isItemSelected}
    >      
      <TableCell align="left" key={key + '_id'}>
        {ingredientId}
      </TableCell>
      <TableCell align="left" key={key + '_name'}>
        {name}
      </TableCell>
      <TableCell align="left" key={key + '_image'}>
        <img src={image[0]?.url} alt="Ingredient Icone" style={{width:'30px', height:'30px'}}/>
      </TableCell>      
      <TableCell align="left" key={key + '_alcoholic'}>
        {alcoholic}
      </TableCell>
      <TableCell align="right" key={key + '_button'}>
        {canSee('moderator') ? (
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            onClick={() => {
              setPageState('form');
              setSelectedIngredient(ingredient);
            }}
          >
            Edit
          </Button>
        ) : (
          <></>
        )}
        {canSee('admin') ? (
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            onClick={() => {
              deleteIngredient(ingredient.ingredientId, ingredient.name);
            }}
          >
            Delete
          </Button>
        ) : (
          <></>
        )}
      </TableCell>
    </TableRow>
  );
};
