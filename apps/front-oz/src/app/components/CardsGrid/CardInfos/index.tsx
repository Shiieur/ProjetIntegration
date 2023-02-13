import { IImage, IGetRecipe } from 'src/app/utils/interfaces';
import CardFooter from '../CardFooter';
import CardTags from './CardTags';
import { Card, Infos, Title } from './style';

export type TCustomCardInfos = {
  recipe: IGetRecipe;
  setPageState: React.Dispatch<React.SetStateAction<'form' | 'list'>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<IGetRecipe>>;
  deleteRecipe: (id: number, name?: string) => Promise<void>;
  inverted?: boolean;
};

const CardInfos = ({ recipe, setPageState, setSelectedRecipe, deleteRecipe, inverted = false }: TCustomCardInfos) => {
  const randomImage = (images: IImage[]) => {
    return images[Math.floor(Math.random() * images.length)]?.url;
  };

  return (
    <Card image={randomImage(recipe.images)}>
      {!inverted && <div></div>}
      <Infos>
        <Title>{recipe.name}</Title>
        <CardTags tags={recipe.tags} />
        <CardFooter
          inverted={inverted}
          bookmarked={recipe.bookmarked}
          recipe={recipe}
          setSelectedRecipe={setSelectedRecipe}
          setPageState={setPageState}
          deleteRecipe={deleteRecipe}
        />
      </Infos>
    </Card>
  );
};
export default CardInfos;
