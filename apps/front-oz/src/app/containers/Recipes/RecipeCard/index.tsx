import './styles.css';
import { CardBody, CardHeader } from './Card';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { IIngredient, IRecipe, IImage } from '../../../utils/interfaces';
import { useEffect } from 'react';
import CardInfos from 'src/app/components/CardsGrid/CardInfos';
import { Container } from 'src/app/components/CardsGrid/style';

export interface IRecipeCard {
  recipes: IRecipe[];
  setPageState: React.Dispatch<React.SetStateAction<'form' | 'list'>>;
  setIngredients: React.Dispatch<React.SetStateAction<IIngredient[]>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<IRecipe>>;
  deleteRecipe: (id: number, name?: string) => Promise<void>;
  onRefresh: () => void;
}

export const RecipeCard = ({
  recipes,
  setPageState,
  setSelectedRecipe, //TODO
  setIngredients, //TODO
  deleteRecipe, //TODO
  onRefresh,
}: IRecipeCard) => {
  useEffect(() => {
    onRefresh();
  }, []);

  const randomImage = (images : IImage[]) => {
    return images[Math.floor(Math.random() * images.length)]?.url;
  }

  return (   
        <Container>
          {recipes.map((recipe, index) => (
            <CardInfos title={recipe.name} tags={recipe.tags} image={randomImage(recipe.images)} inverted={index > 2} bookmarked={recipe.bookmarked}/>
          ))}
        </Container>   
  );
};
export default RecipeCard;
