//COMPONENETS
import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

//COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import FavoritesList from '../components/FavoritesList';

//CSS
import '../css/General.css';
import '../css/FavoritesPage.css';

//IMAGES
import Favorites from '../images/favorites.gif';
const FavoritesPage =()=>{
    const navigate = useNavigate();
    //get UserLoggedIn storage
    const userLoggedIn=localStorage.getItem('userId');
     // If user is not logged in redirect to log in page
     if( userLoggedIn===null ) {
        navigate('/loginPage');
    }
    //LOAD ALL FAVORITES DATA
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const fetchFavorites=()=>{
        axios
          .get("https://recipemom-api.onrender.com/api/v1/favorites")
        //   .get("http://localhost:8080/api/v1/favorites")
          .then((res) => {
            dispatch({
              type: "POPULATE_FAVORITES",
              payload: { favorites: res.data },
            });
          })
          .catch((err) => {
            console.log("thrown error", err);
          });

    }
    //RENDER favorites
    useEffect(() => {
        fetchFavorites();
    }, []); 

    //Obtain all favorites of current logged in User
    console.log('all faves',favorites)
    const favoritesOfUser = favorites.filter(favorite=>{
        if (userLoggedIn === favorite.userID){
            return favorite;
        }
    })
    
    
    const favoriteRecipesOfUser=favoritesOfUser.map(favorite=>{
        return favorite.recipe;
    })
    // console.log("favoritesOfUser", favoriteRecipesOfUser)
    console.log("favoritesOfUser", favoritesOfUser)
    return(
        <>
            <Header/>
                <div className='favorites-page-container'>
                    <div className='favorites-image-container'>
                        <h4>Showing {favoriteRecipesOfUser.length} Favorite Recipes</h4>
                        <img src={Favorites}/>

                    </div>
                    <div className = 'favorites-list-container'>
                  
                     { favoritesOfUser.map(list=>{
                        return <FavoritesList  
                            key={list._id}
                            id={list._id}
                            image={list.recipe.image}
                            label={list.recipe.label}
                            url={list.recipe.url}
                            source={list.source}
                            dietLabels={list.recipe.dietLabels}
                            dishType={list.recipe.dishType}
                            mealType={list.recipe.mealType}
                        />})
                    }

                    </div>
                    
                </div>

            <Footer/>
        </>
    )
}
export default FavoritesPage;