//DEPENDECIES
import { useLocation} from 'react-router';
import {Link, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

//COMPONENTS
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

//CSS
import '../css/General.css';
import '../css/ViewRecipePage.css';

//IMAGES
import RecipeMomLogo from '../images/recipemomlogo.gif';
const ViewRecipePage =()=>{
    //LOAD ALL FAVORITES DATA
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const fetchFavorites=()=>{
        axios
          .get("http://localhost:8080/api/v1/favorites")
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

    console.log('Now I have all favorited recipes',favorites);
    //GET ALL RECIPE IDs
    // const allRecipeIDs = favorites.map(favorite=>{
    //     return favorite.recipe.uri;
    // })
    const allRecipeIDs = favorites.map(favorite=>{
        return {favoriteUserID:favorite.userID,favoriteURI:favorite.recipe.uri};
    })

    const allFavoriteIDs = favorites.map(favorite=>{
        return {favoriteID:favorite._id, favoriteURI:favorite.recipe.uri}
    })

        console.log('all recipe ID',allRecipeIDs)
        console.log('all favorite IDs',allFavoriteIDs)
    
    const[showFavoriteButton,setShowFavoriteButton]=useState(true);

    const navigate = useNavigate();
    //get UserLoggedIn storage
    const userLoggedIn=localStorage.getItem('userId');
     // If user is not logged in redirect to log in page
     if( userLoggedIn===null ) {
        navigate('/loginPage');
    }

    //LOCATOR
    const location = useLocation();
    const viewedRecipe = location.state.list;
        
    console.log('showing userID',userLoggedIn)
    console.log(viewedRecipe,'item from view recipe')

    //HANDLERS 
    
    //Add to Favorites
    const addToFavorites=(e)=>{
        e.preventDefault();
        const configuration = {
            method: 'post',
            url: 'http://localhost:8080/api/v1/favorites/addFavorite',
            data: {
              userID:userLoggedIn,
              recipe:viewedRecipe,
            },
          };
        
          // make the API call
          axios(configuration)
            .then((result) => {
              alert(result.data.status);
              //fetch the favorites list again after adding
              fetchFavorites();
            })
            .catch((error) => {
              alert(error.response.data.status);
            }); 
        }

    //remove from favorites
    const removeFromFavorites=(e)=>{
        e.preventDefault();
        let toDeleteId='';
        /*
        Steps:
        obtain all favorites ID
        compare the viewedRecipeID viewedRecipe.uri
        
        */ 
       allFavoriteIDs.map(list=>{
            if(viewedRecipe.uri === list.favoriteURI){
                console.log('viewedRecipe.uri',viewedRecipe.uri)
                console.log('are equal')
                console.log('FavoriteURI',list.favoriteURI);
                console.log('ID to be deleted is', list.favoriteID)
                console.log('from userID',userLoggedIn)
                toDeleteId = list.favoriteID;
            }
       })
      
        const confirmBox=window.confirm('WARNING: This will be removed from your favorite list');
            if(confirmBox===true){
                axios.delete(`http://localhost:8080/api/v1/favorites/${toDeleteId}`)
                .then(res =>{
                    if( typeof res.data === 'object' ){
                        dispatch({
                            type:'DELETE_FAVORITE',
                            payload:{id:toDeleteId}
                        })
                    }
                    //reload page after action is done
                    fetchFavorites();
                })
            }
    }
    
    //CHECK IF RECIPE IS FAVORITE
    function checkFavorite(){
        //map all favorites recipeID here
        let counter=0;
        allRecipeIDs.map(recipeID=>{
            //here comparing the current viewed recipe if equal to the ones on the list of favorites
            //while taking a look at the current user logged in
            if(viewedRecipe.uri === recipeID.favoriteURI && userLoggedIn === recipeID.favoriteUserID ){
                counter++;
            }
        })
        //check if the viewed recipe is a favorite
        if(counter > 0){
            console.log('recipe is favorited already');
            setShowFavoriteButton(false);
        }else{
            console.log('recipe is not yet favorited')
            setShowFavoriteButton(true);
        }
    }

    // //Render display of favorite buttons
    useEffect(()=>{
       checkFavorite();
    })
    return (
        <>
            <Header/>
            <div className='viewed-recipe-container'>
                <div className='head'>
                    <div className='logo-container'>
                        <img src={RecipeMomLogo}/>
                        <Link to='/' className='return-link'>Return</Link>
                    </div>
                    <div>
                        <div><img src={viewedRecipe.image}/></div>
                        <div><h2>{viewedRecipe.label}</h2></div>
                        <div>
                            <label>Source :</label>
                            <label><a href={viewedRecipe.url}
                                className='link'
                                target='_blank'
                            >  {viewedRecipe.source}</a></label>
                        </div>
                    </div> 

                    <div>
                        <div>
                            <h3>Meal Details</h3>
                        </div>

                        <div>
                            <label className='color-green'>Calories</label>
                            <label>{(viewedRecipe.calories).toFixed(2)}</label>
                        </div>
                        <div>
                            <label className='color-red'>Cautions</label>
                            <label>{viewedRecipe.cautions}</label>
                        </div>
                        <div>
                            <label className='color-blue'>Cuisine Type</label>
                            <label>{viewedRecipe.cuisineType}</label>
                        </div>
                        <div>
                            <label className='color-yellow'>Diet Labels</label>
                            <label>{viewedRecipe.dietLabels}</label>
                        </div>
                        <div>
                            <label className='color-violet'>Dish Type</label>
                            <label>{viewedRecipe.dishType}</label>
                        </div>
                        <div>
                            <label className='color-orange'>Meal Type</label>
                            <label>{viewedRecipe.mealType}</label>
                        </div>
                        <div>
                            <label className='color-goldenrod'>Preparation Time</label>
                            <label>{viewedRecipe.totalTime} minutes</label>
                        </div>
                        <div>
                            <label className='color-dodgerblue'>Weight</label>
                            <label>{(viewedRecipe.totalWeight).toFixed(2)} grams</label>
                        </div>
                    </div>
                    <div>
                        {
                            showFavoriteButton ? 
                            (<button onClick={addToFavorites} className='add-to-favorites-btn'>Add to Favorites</button>)
                            :
                            (<button onClick={removeFromFavorites} className='remove-from-favorites-btn'>Remove From Favorites</button>)
                        }
                    </div>
                </div>

                <div className='body'>
                    <h3>Ingredients</h3>
                    <div>
                        {viewedRecipe.ingredients.map(ingredient=>(
                            <h6><img src={ingredient.image}
                                className='ingredient-image'
                            />{ingredient.text}</h6>
                        ))
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default ViewRecipePage;