import { BottomLeft, BottomRight, Footer } from './style';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarIcon from '@mui/icons-material/Star';
import { colors } from '../../../../assets/colors';
import { IconButton } from '@mui/material';
import { IGetRecipe } from 'src/app/utils/interfaces';

export type TCustomFooter = {
  inverted: boolean;
  bookmarked: boolean;
  recipe: IGetRecipe;
  setPageState: React.Dispatch<React.SetStateAction<'form' | 'list'>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<IGetRecipe>>;
  deleteRecipe: (id: number, name?: string) => Promise<void>;
};

const CardFooter = ({ inverted, bookmarked, recipe, setPageState, setSelectedRecipe, deleteRecipe }: TCustomFooter) => {
  return (
    <Footer>
      {inverted ? (
        <>
          <BottomLeft>
            <IconButton onClick={() => console.log('Clicked')}>
              {bookmarked ? <StarIcon sx={{ color: colors.white }} fontSize="large" /> : <StarOutlineOutlinedIcon sx={{ color: colors.white }} fontSize="large" />}
            </IconButton>
          </BottomLeft>
          <BottomRight>
            <IconButton
              onClick={() => {
                setPageState('list');
                setSelectedRecipe(recipe);
              }}
            >
              <ArrowForwardIosIcon sx={{ color: colors.white }} fontSize="large" />
            </IconButton>
          </BottomRight>
        </>
      ) : (
        <>
          <BottomLeft>
            <IconButton
              onClick={() => {
                setPageState('list');
                setSelectedRecipe(recipe);
              }}
            >
              <ArrowBackIosIcon sx={{ color: colors.white }} fontSize="large" />
            </IconButton>
          </BottomLeft>
          <BottomRight>
            <IconButton onClick={() => console.log('Clicked')}>
              <StarOutlineOutlinedIcon sx={{ color: colors.white }} fontSize="large" />
            </IconButton>
          </BottomRight>
        </>
      )}
    </Footer>
  );
};

export default CardFooter;
