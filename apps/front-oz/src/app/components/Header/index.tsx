import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import BookMarkIcon from '@mui/icons-material/BookMark';
import CloseIcon from '@mui/icons-material/Close';
import FaceIcon from '@mui/icons-material/Face';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SearchIcon from '@mui/icons-material/Search';
import LogoutButton from '../../utils/auth0/logoutButton';
import LoginButton from '../../utils/auth0/loginButton';
import IconButton from '../IconButton';
import { Text } from '../Inputs/Text';
import TextField from '../Inputs/TextField';
import { Container, StyledContainer, TextFieldContainer } from './style';
import SigninButton from 'src/app/utils/auth0/signinButton';
import { Button } from '@mui/material';
import { colors } from 'src/assets/colors';
import { canSee } from 'src/app/utils/functions';
import { useNavigate } from 'react-router-dom';
import { IGetRecipe, RecipeType } from 'src/app/utils/interfaces';

interface IHeaderProps {
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  selectedRecipe: IGetRecipe;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<IGetRecipe>>;
  setFilterUser: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterType: React.Dispatch<React.SetStateAction<RecipeType>>;
  setRecipeFilterSearch: React.Dispatch<React.SetStateAction<string>>;
  setIngredientFilterSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ setPageState, selectedRecipe, setSelectedRecipe, setFilterUser, setFilterType, setRecipeFilterSearch, setIngredientFilterSearch }: IHeaderProps) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [dropBoxState, setDropBoxState] = useState<'search' | 'menu'>('search');
  const closeHeight = 50;
  const openHeight = 170;
  const openHeightMenu = 300;
  const [height, setHeight] = useState(closeHeight);

  const resetRecipe = () => {
    setSelectedRecipe({
      recipeId: -1,
      name: '',
      images: [],
      bookmarked: false,
      steps: '',
      quantity: 0, //for the number of person
      type: RecipeType.DRINK,
      author: '',
      tags: [],
      ingredients: [],
    });
  };

  return (
    <StyledContainer duration={500} height={height}>
      <Container>
        <IconButton
          onClick={() => {
            setSelectedRecipe({ ...selectedRecipe, recipeId: -1 });
            setFilterUser(false);
            setFilterType(RecipeType.DRINK);
            setPageState('list');
            navigate('recipes');
            setHeight(closeHeight);
          }}
        >
          <LocalBarIcon fontSize="large" />
        </IconButton>
        <IconButton
          onClick={() => {
            setSelectedRecipe({ ...selectedRecipe, recipeId: -1 });
            setFilterUser(false);
            setFilterType(RecipeType.MEAL);
            setPageState('list');
            navigate('recipes');
            setHeight(closeHeight);
          }}
        >
          <LocalDiningIcon fontSize="large" />
        </IconButton>
        <IconButton
          onClick={
            () => {
              if (height < openHeight) {
                setDropBoxState('search');
              }
              setHeight(height === closeHeight ? openHeight : closeHeight);
            } //if closed -> open search -> else close
          }
          hasBorder={true}
          transformY={`25px`}
          style={{ position: 'absolute' }}
        >
          {height === closeHeight ? <SearchIcon fontSize="large" /> : <CloseIcon fontSize="large" />}
        </IconButton>
        <IconButton onClick={() => console.log('Clicked')}>
          <BookMarkIcon fontSize="large" />
        </IconButton>
        <IconButton
          onClick={() => {
            //if open and on search, close and re-open on menu / if open on menu, do nothing / if closed, open on menu
            if (height < openHeight) {
              setDropBoxState('menu');
              setHeight(openHeightMenu);
            }
            if (dropBoxState === 'search') {
              setHeight(closeHeight);
              setDropBoxState('menu');
              setHeight(openHeightMenu);
            }
          }}
        >
          {/* doesn't work very well, the loading of the PP is to long */}
          {isAuthenticated && user !== undefined ? (
            <img src={user?.picture} style={{ width: '40px', height: '40px', borderRadius: '100px', border: `2px solid ${colors.green}` }} alt="logo of user" />
          ) : (
            <FaceIcon fontSize="large" />
          )}
        </IconButton>
      </Container>
      {dropBoxState === 'search' ? (
        <Container>
          <TextFieldContainer>
            <Text>Recette</Text>
            <TextField placeholder={'Search...'} type="Recipe" setRecipeFilterSearch={setRecipeFilterSearch} setIngredientFilterSearch={setIngredientFilterSearch} />
          </TextFieldContainer>
          <TextFieldContainer>
            <Text>Ingredient</Text>
            <TextField placeholder={'Search...'} type="Ingredient" setRecipeFilterSearch={setRecipeFilterSearch} setIngredientFilterSearch={setIngredientFilterSearch} />
          </TextFieldContainer>
        </Container>
      ) : (
        <Container>
          <TextFieldContainer>
            {isAuthenticated && !isLoading ? (
              <>
                <Button
                  sx={{ color: 'white', fontFamily: 'comfortaa', fontSize: '1.4rem' }}
                  onClick={() => {
                    setFilterUser(true);
                    setHeight(closeHeight);
                  }}
                >
                  Mes recettes
                </Button>
                {canSee('moderator') === true ? (
                  <Button
                    sx={{ color: 'white', fontFamily: 'comfortaa', fontSize: '1.4rem' }}
                    onClick={() => {
                      setPageState('list');
                      navigate('ingredients');
                      setHeight(closeHeight);
                    }}
                  >
                    Ingrédients
                  </Button>
                ) : (
                  <></>
                )}
                <Button
                  sx={{ color: 'white', fontFamily: 'comfortaa', fontSize: '1.4rem' }}
                  onClick={() => {
                    resetRecipe();
                    setPageState('form');
                    navigate('recipes');
                    setHeight(closeHeight);
                  }}
                >
                  Ajouter une recette
                </Button>
                <LogoutButton />
              </>
            ) : (
              <>
                <SigninButton />
                <LoginButton />
              </>
            )}
          </TextFieldContainer>
        </Container>
      )}
    </StyledContainer>
  );
};

export default Header;
