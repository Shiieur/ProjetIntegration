import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import IconButton from '../IconButton';
import './styles.css';

interface IProps {  
  endpoint: string;
  url: string;
}

const NavigationButton = (props: IProps) => {
  return <IconButton onClick={() => window.location.replace(`${props.url}${props.endpoint}`)}><LocalBarIcon fontSize="large" /></IconButton>  
};

export default NavigationButton;
