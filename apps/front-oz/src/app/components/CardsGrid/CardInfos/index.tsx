import CardFooter from '../CardFooter';
import CardTags from './CardTags';
import { Card, Infos, Title } from './style';

export type TCustomCardInfos = {
    title: string;
    tags: string[];
    image: string;
    inverted?: boolean;
    bookmarked: boolean;
}

const CardInfos = ({
    title,
    tags,
    image,
    inverted = false,
    bookmarked,
} : TCustomCardInfos) => { 
    return (    
        <Card image={image}>
            {!inverted && <div></div>}
            <Infos>
                <Title>{title}</Title>
                <CardTags tags={tags}/>  
                <CardFooter inverted={inverted} bookmarked={bookmarked}/>              
            </Infos>            
        </Card>     
    )
};
export default CardInfos;


