//DEPENDECIES
import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

//CSS
import '../css/General.css';
import '../css/FavoritesList.css';


const FavoritesList =(props)=>{
    console.log('favorites list of user',props.favoriteRecipesOfUser);
    console.log('ID favorite',props.favoritesOfUser)
    //REMOVE FAVORITE
    const dispatch=useDispatch();

    const onRemove=()=>{
        
        const confirmBox=window.confirm('WARNING: This will remove the recipe from your favorites');
        if(confirmBox===true){
            axios.delete(`https://recipemom-api.onrender.com/api/v1/favorites/`)
            .then(res =>{
                if( typeof res.data === 'object' ){
                    dispatch({
                        type:'DELETE_FAVORITE',
                        // payload:{id}
                    })
                }
                //reload page after action is done
                window.location.reload();
            })
        }
    }

    return(
        <>
                                 
            <div className = 'list-container'>
                {
                    props.favoriteRecipesOfUser.map(list => (
                        <>
                            <div className ='recipe-container'>
                                
                                <img src = {list.image}/>
                                <h5>{list.label}</h5>
                                <div>
                                    <label><small className='color-green'>Source</small></label>
                                    <label>
                                        <a href = {list.url}
                                            target='_blank'
                                            className='link'
                                        >{list.source}</a>
                                    </label>
                                </div>
                                <div>
                                    <label><small className='color-blue'>Diet Labels</small></label>
                                    <label>
                                        <small>{list.dietLabels}</small>
                                    </label>
                                </div>
                                <div>
                                    <label><small className='color-red'>Dish Type</small></label>
                                    <label>
                                        <small>{list.dishType}</small>
                                    </label>
                                </div>
                                <div>
                                    <label><small className='color-brown'>Meal Type</small></label>
                                    <label>
                                        <small>{list.mealType}</small>
                                    </label>
                                </div>
                                {/* <div>
                                    <button 
                                        className='action-buttons'
                                        onClick={onRemove}
                                        >REMOVE</button>
                                </div> */}
                            </div>
                        </>
                    ))
                } 
            </div> 
        </>  
    )
}
export default FavoritesList;
