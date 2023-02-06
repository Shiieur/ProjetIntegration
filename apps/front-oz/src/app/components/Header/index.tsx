import { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';

import { useAuth0 } from '@auth0/auth0-react';
import BookMarkIcon from '@mui/icons-material/BookMark';
import CloseIcon from '@mui/icons-material/Close';
import FaceIcon from '@mui/icons-material/Face';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SearchIcon from '@mui/icons-material/Search';
import LogoutButton from '../../utils/auth0/logoutButton';
import LoginButton from '../../utils/auth0/loginButton';
import FormInput from '../FormInput';
import IconButton from '../IconButton';
import { Text } from '../Inputs/Text';
import TextField from '../Inputs/TextField';
import { Container, StyledContainer, TextFieldContainer } from './style';
import NavigationButton from '../NavigationButton/NavigationButton';
import SigninButton from 'src/app/utils/auth0/signinButton';
import { Button } from '@mui/material';
import { colors } from 'src/assets/colors';
import { canSee } from 'src/app/utils/functions';
import { useNavigate } from 'react-router-dom';
import { RecipeType } from 'src/app/utils/interfaces';

interface IHeaderProps {
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  pageState: 'list' | 'form';
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Header = ({
  pageState, 
  setPageState
} : IHeaderProps) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [dropBoxState, setDropBoxState] = useState<'search' | 'menu'>('search');
  const closeHeight = 50;
  const openHeight = 170;
  const openHeightMenu = 300;
  const [height, setHeight] = useState(closeHeight);
  const url = 'http://localhost:4200';

  return (
    <StyledContainer duration={500} height={height}>
      <Container>
        <IconButton onClick ={() => {navigate("recipes"); localStorage.setItem('search', RecipeType.MEAL)}}>
          <LocalBarIcon fontSize="large" />
        </IconButton>
        <IconButton onClick ={() => {navigate("recipes"); localStorage.setItem('search', RecipeType.DRINK)}}>
          <LocalDiningIcon fontSize="large" />
        </IconButton>
        <IconButton
          onClick={() => {if(height < openHeight){setDropBoxState('search')}; setHeight(height === closeHeight ? openHeight : closeHeight)} //if closed -> open search -> else close
          }
          hasBorder={true}
          transformY={`25px`}
          style={{ position: 'absolute' }}
        >
          {height === closeHeight ? (
            <SearchIcon fontSize="large" />
          ) : (
            <CloseIcon fontSize="large" />
          )}
        </IconButton>
        <IconButton onClick={() => console.log('Clicked')}> 
          <BookMarkIcon fontSize="large" />
        </IconButton>        
        <IconButton onClick={() => { //if open and on search, close and re-open on menu / if open on menu, do nothing / if closed, open on menu
          if(height < openHeight){
            setDropBoxState('menu');
            setHeight(openHeightMenu);
          }; 
          if (dropBoxState==='search') {
            setHeight(closeHeight);
            setDropBoxState('menu');
            setHeight(openHeightMenu);            
          }; 
          }}>
          {/* doesn't work very well, the loading of the PP is to long */}
          {isAuthenticated && user !== undefined ? (<img src={user?.picture} style={{width:'40px', height:'40px', borderRadius:'100px', border: `2px solid ${colors.green}`}} alt='logo of user'/>) : (<FaceIcon fontSize="large" />)}         
        </IconButton>   
      </Container>
      {
        dropBoxState === 'search' ? (
        <Container>
          <TextFieldContainer>
            <Text>Recette</Text>
            <TextField placeholder={'Search...'} />
          </TextFieldContainer>
          <TextFieldContainer>
            <Text>Ingredient</Text>
            <TextField placeholder={'Search...'} />
          </TextFieldContainer>
        </Container>
        ) : (
        <Container>
          <TextFieldContainer>
            {isAuthenticated && !isLoading ? (
            <>
            <Button sx={{ color: 'white', fontFamily: 'comfortaa', fontSize: '1.4rem'}}>Mes recettes</Button>
            {canSee('moderator') === true ? <Button sx={{ color: 'white', fontFamily: 'comfortaa', fontSize: '1.4rem'}} onClick ={() => {navigate("ingredients"); setHeight(closeHeight)}}>Ingrédients</Button> : <></>}      
            <Button sx={{ color: 'white', fontFamily: 'comfortaa', fontSize: '1.4rem'}} onClick ={() => {setPageState('form'); navigate("recipes"); setHeight(closeHeight)}}>Ajouter une recette</Button>
            <LogoutButton/>
            </>
            ) : (
            <>
            <SigninButton/>
            <LoginButton />
            </>
            )}
          </TextFieldContainer>        
        </Container>
      )
      }      
    </StyledContainer>
  );
};

export default Header;
