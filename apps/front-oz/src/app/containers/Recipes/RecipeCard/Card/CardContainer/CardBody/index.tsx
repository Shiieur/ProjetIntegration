import { CardContent, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TrashIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import './styles.css';
import React from 'react';
import { IIngredient, IRecipe } from '../../../../../../utils/interfaces';
import { canSee } from '../../../../../../utils/functions';

interface IProps {
  recipe: IRecipe;
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<IRecipe>>;
  setIngredients: React.Dispatch<React.SetStateAction<IIngredient[]>>;
  deleteRecipe: (id: number, name?: string) => Promise<void>;
}

export const CardBody = ({
  recipe,
  setPageState,
  setSelectedRecipe,
  setIngredients,
  deleteRecipe,
}: IProps) => {
  return (
    <CardContent>
      <div className="body">
        <div className="bodyHeader">
          <Typography gutterBottom variant="h5" component="div">
            {recipe.name} ({recipe.quantity}L)
          </Typography>
          {canSee('moderator') ? (
            <IconButton
              aria-label="edit_recipe"
              size="small"
              onClick={() => {
                setPageState('form');
                setSelectedRecipe(recipe);
                setIngredients(recipe.ingredients);
              }}
            >
              <EditIcon />
            </IconButton>
          ) : (
            <></>
          )}
          {canSee('admin') ? (
            <IconButton
              aria-label="delete_recipe"
              size="small"
              onClick={() => {
                deleteRecipe(recipe.id, recipe.name);
              }}
            >
              <TrashIcon />
            </IconButton>
          ) : (
            <></>
          )}
        </div>
        <div className="bodyBody">
          <Typography variant="body2" color="text.secondary">
            {recipe.ingredients.map((ingredient) => (
              <li>
                {ingredient.name}:{ingredient.name} {ingredient.name}
                {/* need to change name by recipe.ingredient.quantity and recipe.ingredient.unit */}
              </li>
            ))}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe.steps}
          </Typography>
        </div>
      </div>
    </CardContent>
  );
};
export default CardBody;
