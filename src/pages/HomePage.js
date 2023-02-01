//COMPONENTS
import APIFetchRecipes from '../components/APIFetchRecipes.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
const HomePage =()=>{
    return(
        <>
            <Header/>
                <APIFetchRecipes/>
            <Footer/>
        </>
    )
}

export default HomePage;