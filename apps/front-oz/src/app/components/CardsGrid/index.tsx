import CardInfos from './CardInfos';
import { Container } from './style';

const CardsGrid = () => { 
    return (        
        <Container>
            <CardInfos title="Amaretto sour" tags={['Amaretto', 'Lemon Juice', 'Maple Syrup']} image="https://www.acouplecooks.com/wp-content/uploads/2020/03/Amaretto-Sour-017.jpg" inverted={true} />
            <CardInfos title="Mojito" tags={['Mint', 'White Rum', 'Lime Juice']} image="https://www.acouplecooks.com/wp-content/uploads/2019/11/Mojito-Recipe-056.jpg" inverted={true} />
            <CardInfos title="Margarita" tags={['Tequila', 'Cointreau', 'Lime Juice']} image="https://www.acouplecooks.com/wp-content/uploads/2020/03/Margarita-024.jpg" inverted={true} />
            <CardInfos title="Moscow Mule" tags={['Vodka', 'Lime Juice', 'Ginger Beer']} image="https://www.acouplecooks.com/wp-content/uploads/2019/06/Moscow-Mule-070.jpg" />
            <CardInfos title="Gin Tonic" tags={['Gin', 'Tonic', 'Lime']} image="https://www.acouplecooks.com/wp-content/uploads/2020/03/Gin-and-Tonic-006.jpg" />
            <CardInfos title="Cosmopolitan" tags={['Vodka', 'Cranberry Juice', 'Cointreau']} image="https://www.acouplecooks.com/wp-content/uploads/2019/12/Cosmopolitan-Cocktail-006.jpg" />                   
        </Container>
    )
};
export default CardsGrid;