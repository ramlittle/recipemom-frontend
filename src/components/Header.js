//DEPENDENCIES
import {Link} from 'react-router-dom';
import React, { useState, useEffect } from "react";
//CSS
import '../css/General.css';
import '../css/Header.css';
import '../css/Media.css';
//COMPONENTS
import Logout from '../components/Logout.js';
const Header =()=>{
    //obtain what is in localStorage
    const userLoggedIn=localStorage.getItem('userId');
    const userPicture=localStorage.getItem('userPicture');
    const userFirstName=localStorage.getItem('userFirstName');
    const userLastName = localStorage.getItem('userLastName');
    const userEmail=localStorage.getItem('userEmail'); 
    const mailto=`mailto:${userEmail}`;
    //check login
    const [isLoggedin, setIsLoggedin] = useState(false);
    function checkLogin(){
        if(userLoggedIn!==null){
            setIsLoggedin(true)
        }
    }

    //Use effect to avoid to many renders issue
    useEffect(()=>{
        checkLogin();
    },[])
    return(
        <header>
            {
                !isLoggedin?
                (
                <div className='user-login-and-signup'>
                    <Link to ='/signUpPage'><a href=''>Sign Up</a></Link>
                    <Link to ='/loginPage'><a href=''>Login</a></Link>
                </div>
                ):(
                <div className='user-login-details'>
                    <a href={userPicture} title='view image' target='_blank'>
                        <img src={userPicture}/>
                    </a> Welcome,
                    <strong> {userFirstName} {userLastName} </strong> 
                    <a href={mailto} title='send email'> {userEmail} </a>
                    <Link to ='/' title='go back to home page'>Home</Link>
                    <Link to ='/favoritesPage' title='see favorites'>My Favorites</Link>
                    <Logout/>
                </div>
                ) 
            }
        </header>
    )
}
export default Header;