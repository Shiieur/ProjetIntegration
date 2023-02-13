import { CardContent, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TrashIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import React from 'react';
import { IIngredient, IGetRecipe, IGetIngredient } from '../../../../../../utils/interfaces';
import { canSee } from '../../../../../../utils/functions';
import { ColumnGrid, RowGrid, Image } from './style';
import { getUnits } from 'src/app/components/FormSelectList/helper';

interface IProps {
  recipe: IGetRecipe;
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<IGetRecipe>>;
  setIngredients: React.Dispatch<React.SetStateAction<IGetIngredient[]>>;
  deleteRecipe: (id: number, name?: string) => Promise<void>;
}

export const CardBody = ({ recipe, setPageState, setSelectedRecipe, setIngredients, deleteRecipe }: IProps) => {
  const units = getUnits();
  return (
    <CardContent>
      <ColumnGrid>
        <Image src={recipe.images[0]?.url} alt={recipe.name} />
        <RowGrid>
          <div className="top-infos">
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
                  deleteRecipe(recipe.recipeId, recipe.name);
                }}
              >
                <TrashIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </div>
          <div className="title">
            <Typography gutterBottom variant="h5" component="div">
              {recipe.name} ({recipe.quantity} serving)
            </Typography>
          </div>
          <div className="ingredients">
            <Typography variant="body2" color="text.secondary">
              {recipe.ingredients.map((ingredient) => (
                <li>
                  {ingredient.name}:{ingredient.quantity}
                  {ingredient.unit?.name ?? ''}
                </li>
              ))}
            </Typography>
          </div>
          <div className="steps">
            <Typography variant="body2" color="text.secondary">
              {recipe.steps}
            </Typography>
          </div>
        </RowGrid>
      </ColumnGrid>
    </CardContent>
  );
};
export default CardBody;
