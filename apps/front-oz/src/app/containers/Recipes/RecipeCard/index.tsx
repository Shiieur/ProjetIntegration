import './styles.css';
import * as React from 'react';
import { IGetRecipe, IGetIngredient, RecipeType } from '../../../utils/interfaces';
import { useEffect } from 'react';
import CardInfos from 'src/app/components/CardsGrid/CardInfos';
import { Container } from 'src/app/components/CardsGrid/style';

export interface IRecipeCard {
  recipes: IGetRecipe[];
  setPageState: React.Dispatch<React.SetStateAction<'form' | 'list'>>;
  setIngredients: React.Dispatch<React.SetStateAction<IGetIngredient[]>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<IGetRecipe>>;
  deleteRecipe: (id: number, name?: string) => Promise<void>;
  user: string;
  filterUser: boolean;
  filterType: RecipeType;
  onRefresh: () => void;
}

export const RecipeCard = ({ recipes, setPageState, setSelectedRecipe, setIngredients, deleteRecipe, user, filterUser, filterType, onRefresh }: IRecipeCard) => {
  useEffect(() => {
    onRefresh();
  }, []);

  //allows to swap side every 3 cards
  const isInverted = (index: number) => {
    const realIndex = index + 1;
    return realIndex === 1 || realIndex === 2 || realIndex === 3 || (realIndex - 1) % 6 === 0 || (realIndex - 2) % 6 === 0 || (realIndex - 3) % 6 === 0;
  };

  return (
    <Container>
      {recipes
        .filter((recipe) => !filterUser || recipe.author === user)
        .filter((recipe) => recipe.type === filterType)
        .map((recipe, index) => (
          <CardInfos recipe={recipe} inverted={isInverted(index)} setSelectedRecipe={setSelectedRecipe} setPageState={setPageState} deleteRecipe={deleteRecipe} />
        ))}
    </Container>
  );
};
export default RecipeCard;
