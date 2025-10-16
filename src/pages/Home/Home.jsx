
import About from './Components/About/About';
import Banner from './Components/Banner';
import CallToAction from './Components/Call To Action/CallToAction';
import PetCategory from './Components/Pet Category/PetCategory';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PetCategory></PetCategory>
            <CallToAction></CallToAction>
            <About></About>
        </div>
    );
};

export default Home;