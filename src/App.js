import {Routes,Route} from 'react-router';

//PAGES
import HomePage from './pages/HomePage.js';
import AboutPage from './pages/AboutPage.js';
import ViewRecipePage from './pages/ViewRecipePage.js';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import FavoritesPage from './pages/FavoritesPage.js';
const App =()=>{
  return(
    <>
     <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path ='/aboutPage' element ={<AboutPage/>}/>
        <Route path ='/viewRecipePage' element = {<ViewRecipePage/>}/>
        <Route path ='/loginPage' element = {<LoginPage/>}/>
        <Route path ='/signUpPage' element = {<SignUpPage/>}/>
        <Route path ='/favoritesPage' element = {<FavoritesPage/>}/>
     </Routes>
    </>
  )
}

export default App;