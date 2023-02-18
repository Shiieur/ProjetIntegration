import { CardContent, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TrashIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import React from 'react';
import { IGetRecipe, IGetIngredient } from '../../../../../../utils/interfaces';
import { canSee } from '../../../../../../utils/functions';
import { CardGrid, InfosGrid, Images, TopInfos, IngredientList, ImageIngredient, Rowing, WhiteText, Here } from './style';

interface IProps {
  recipe: IGetRecipe;
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<IGetRecipe>>;
  setIngredients: React.Dispatch<React.SetStateAction<IGetIngredient[]>>;
  deleteRecipe: (id: number, name?: string) => Promise<void>;
}

export const CardBody = ({ recipe, setPageState, setSelectedRecipe, setIngredients, deleteRecipe }: IProps) => {
  return (
    <CardContent>
      <CardGrid>
        <Images image={recipe.images[0]?.url} />
        <InfosGrid>
          <TopInfos>
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
                  setSelectedRecipe({ ...recipe, recipeId: -1 });
                  setPageState('list');
                }}
              >
                <TrashIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </TopInfos>
          <Typography gutterBottom variant="h5" component="div">
            {recipe.name} ({recipe.quantity} {recipe.quantity === 1 ? 'portion' : 'portions'})
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Here>
              {recipe.ingredients.map((ingredient) => (
                <IngredientList>
                  <Rowing>
                    <ImageIngredient image={ingredient.image[0]?.url} /> {ingredient.name}: {' ' + ingredient.quantity + ' '}
                    {ingredient.unit?.name ?? ''}
                  </Rowing>
                </IngredientList>
              ))}
            </Here>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <WhiteText>{recipe.steps}</WhiteText>
          </Typography>
        </InfosGrid>
      </CardGrid>
    </CardContent>
  );
};
export default CardBody;
