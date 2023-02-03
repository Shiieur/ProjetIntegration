import { BottomLeft, BottomRight, Footer } from './style';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import { colors } from '../../../../assets/colors'
import { IconButton } from '@mui/material';


export type TCustomFooter = {    
    inverted: boolean;
}

const CardFooter = ({
    inverted
} : TCustomFooter) => {
    return (
        <Footer>
            {inverted ? (
                <>      
                    <BottomLeft>
                        <IconButton onClick={() => console.log('Clicked')}>
                            <StarOutlineOutlinedIcon sx={{ color: colors.white }} fontSize="large"/>
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
 