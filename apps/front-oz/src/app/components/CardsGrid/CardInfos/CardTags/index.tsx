import { Tags } from './style';

export type TCustomCardTags = {
    tags: string[];
}

const CardTags = ({    
    tags,    
} : TCustomCardTags) => { 
    return (   
        <Tags>
            {tags.map(tag => (
                <><li>{tag}</li><br /></>
            )                
            )}
        </Tags>    
    )
};
export default CardTags;


