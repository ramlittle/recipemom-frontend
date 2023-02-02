//DEPENDECIES
import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

//CSS
import '../css/General.css';
import '../css/FavoritesList.css';


const Favoritesprops =(props)=>{
    //REMOVE FAVORITE
    const dispatch=useDispatch();
    const onRemove=()=>{
        const confirmBox=window.confirm('WARNING: This will remove the favorite from your favorites');
        
        
        if(confirmBox===true){
            axios.delete(`https://favoritemom-api.onrender.com/api/v1/favorites/${props.id}`)
            // axios.delete(`http://localhost:8080/api/v1/favorites/${props.id}`)
            .then(res =>{
                if( typeof res.data === 'object' ){
                    dispatch({
                        type:'DELETE_FAVORITE',
                        payload:{id:props.id}
                    })
                }
                //reload page after action is done
                window.location.reload();
            })
        }
    }

    return(
        <>
            <div className ='favorite-container'>
                                <img src = {props.image}/>
                                <h5>{props.label}</h5>
                              
                                <div>
                                    <label><small className='color-green'>Source</small></label>
                                    <label>
                                        <a href = {props.url}
                                            target='_blank'
                                            className='link'
                                        >{props.source}</a>
                                    </label>
                                </div>
                                <div>
                                    <label><small className='color-blue'>Diet Labels</small></label>
                                    <label>
                                        <small>{props.dietLabels}</small>
                                    </label>
                                </div>
                                <div>
                                    <label><small className='color-red'>Dish Type</small></label>
                                    <label>
                                        <small>{props.dishType}</small>
                                    </label>
                                </div>
                                <div>
                                    <label><small className='color-brown'>Meal Type</small></label>
                                    <label>
                                        <small>{props.mealType}</small>
                                    </label>
                                </div>
                                <div>
                                <button 
                                    className='action-buttons'
                                    onClick={onRemove}
                                    >DELETE</button>
                                </div>
                            </div>
              
        </>  
    )
}
export default Favoritesprops;
