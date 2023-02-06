import { BottomLeft, BottomRight, Footer } from './style';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarIcon from '@mui/icons-material/Star';
import { colors } from '../../../../assets/colors'
import { IconButton } from '@mui/material';


export type TCustomFooter = {    
    inverted: boolean;
    bookmarked: boolean;
}

const CardFooter = ({
    inverted,
    bookmarked
} : TCustomFooter) => {
    return (
        <Footer>
            {inverted ? (
                <>      
                    <BottomLeft>
                        <IconButton onClick={() => console.log('Clicked')}>
                            {bookmarked ? (
                                <StarIcon sx={{ color: colors.white }} fontSize="large"/>
                            ) : (
                                <StarOutlineOutlinedIcon sx={{ color: colors.white }} fontSize="large"/>
                            )}                            
                        </IconButton>                        
                    </BottomLeft>
                    <BottomRight>
                        <IconButton onClick={() => console.log('Clicked')}>
                            <ArrowForwardIosIcon sx={{ color: colors.white }} fontSize="large"/>
                        </IconButton>
                    </BottomRight>
                </>
            ) : (
                <>
                    <BottomLeft>
                        <IconButton onClick={() => console.log('Clicked')}>
                            <ArrowBackIosIcon sx={{ color: colors.white }} fontSize="large"/>
                        </IconButton>
                    </BottomLeft>
                    <BottomRight>
                        <IconButton onClick={() => console.log('Clicked')}>
                            <StarOutlineOutlinedIcon sx={{ color: colors.white }} fontSize="large"/>
                        </IconButton>
                    </BottomRight>
                </>
            )}                    
        </Footer>
    )
};

export default CardFooter;
 