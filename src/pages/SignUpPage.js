//dependecies
import {Link, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

//CSS
import '../css/General.css';
import '../css/SignUpPage.css';
import '../css/Media.css'

//IMAGES
import GreatChoice from '../images/greatchoice.gif';
const SignUpPage =()=> {

    const navigate=useNavigate();
    //STATES
    const [firstName,setFirstName]=useState();
    const [lastName,setLastName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [confirmPassword,setConfirmPassword]=useState();
    const [showPassword,setShowPassword]=useState('password');
    const [pictureLink,setPictureLink]=useState();
    const [errorMessage,setErrorMessage]=useState();

  // initial load of data
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("https://recipemom-api.onrender.com/api/v1/users")
      // .get("http://localhost:8080/api/v1/users")
      .then((res) => {
        //   setData(res.data);
        //dispatch the data into reducer
        dispatch({
          type: "POPULATE_USERS",
          payload: { users: res.data },
        });
      })
      .catch((err) => {
        console.log("thrown error", err);
      });
  }, []); //initial load display only, if [] is not here, it will not stop displaying on console.
  console.log('Now I have all the users behind the console',users);
  console.log('obtaining only emails');

  //Obtain all emails from the users array on initial load
  let allUserEmails=users.map(user=>{
    return user.email;
  })
  console.log(allUserEmails);

    //REGISTER NEW USER
    const signUpUser=(e)=>{
        e.preventDefault();

      
          //check if email already exists
        let counter=0;
        allUserEmails.map(allUserEmail=>{
            if(email==allUserEmail){
                counter++;
            }
        })
        if(counter>0){
            // alert('email already exists');
            setErrorMessage('The email entered already exists on one of the users registered')
        }
        //check if password mismatched
        else if(password!=confirmPassword){
            // alert('Entered Passwords did not match');
            setPassword('');
            setConfirmPassword('');
            setErrorMessage('Passwords Do Not Match!')
       
        }else{

        //proceed to add if no problems
        const configuration = {
            method: 'post',
            url: 'https://recipemom-api.onrender.com/api/v1/users/signUp',
            // url: 'http://localhost:8080/api/v1/users/signUp',
            data: {
              firstName:firstName,
              lastName:lastName,
              email:email,
              password:password,
              pictureLink:pictureLink
            },
          };
        
          // make the API call
          axios(configuration)
            .then((result) => {
              alert(result.data.status);
              // window.location.reload(false);
              navigate('/loginPage');
            })
            .catch((error) => {
              alert(error.response.data.status);
            }); 
        }
   
    }
     //CLEAR FORM
     const onClearFormHandler=()=>{
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    //SHOW PASSWORD CHECKBOX
    const onCheckBox=(e)=>{
      if(e.target.checked){
        setShowPassword('text');
      }else{
        setShowPassword('password');
      }
    }

    //SET NO PICTURE LINK
    const onNoPictureLink=(e)=>{
      if(e.target.checked){
        setPictureLink('https://w7.pngwing.com/pngs/87/120/png-transparent-chef-cartoon-chef-hand-cook-cooking.png')
      }else{
        setPictureLink('')
      }
    }
    return(
        <section className='registration-container'>
          <div className='registration-form-container'>
            <h2>Register an Account</h2> 
            <form onSubmit={(e) => signUpUser(e)}
                className='register-form'>
              <div className='field-container'>
                <label htmlFor = 'firstName'>First Name: </label>
                <input type = 'text' name = 'firstName' required
                    placeholder='First Name'
                    value={firstName}
                    onChange={(e)=>setFirstName((e.target.value).toUpperCase())}
                />
              </div>
              
              <div className='field-container'>
              <label htmlFor = 'lastName'>Last Name: </label>
                  <input type = 'text' name = 'lastName' required
                      placeholder='Last Name'
                      value={lastName}
                      onChange={(e)=>setLastName((e.target.value).toUpperCase())}
                  />
              </div>
              
              <div className='field-container'>
                <label htmlFor = 'email'>Email: </label>
                    <input type = 'email' name = 'email' required
                        placeholder='sample@email.com'
                        value={email}
                        onChange={(e)=>setEmail((e.target.value).toLowerCase())}
                    />
              </div>

              <div className='field-container'>
              <label htmlFor = 'password'>Password</label>
                  <input type = {showPassword} name='password' required
                      placeholder='enter password'
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                  />
              </div>
              
              <div className='field-container'>

              <label htmlFor ='confirmPassword'>Confirm Password</label>    
                  <input type= {showPassword}  name = 'confirmPassword' required
                      placeholder='re-enter password'
                      value={confirmPassword}
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                  />
              </div>

              <div className='field-container'>

              <label htmlFor='showPassword'>Show Password</label>
                  <input type='checkbox' name = 'showPassword'
                      onChange={onCheckBox}
                  />
                  
              </div>

              <div className='field-container'>
                <label htmlFor='pictureLink'>Picture Link</label>
                  <input type='text' name='pictureLink'
                      placeholder='Picture Link, paste linked in Link here'
                      value={pictureLink}
                      onChange={(e)=>setPictureLink(e.target.value)}
                      required
                  />
              </div>
              <div className='field-container'>
                <label htmlFor='noPictureLink'>No Picture Link</label>
                    <input type ='checkbox' name='noPictureLink'
                      onChange={onNoPictureLink}  
                    />
              </div>
              <div className='form-buttons-container'>
              <button type="submit" className='submit-button'>Submit</button>
              <button type='button' className='clear-button'onClick={onClearFormHandler}>Clear</button>
              </div>
              <small className='error-message'>{errorMessage}</small>
            </form>

          </div>

          <div className='registration-picture-container'>
              <img src={GreatChoice}/>
              <Link to='/' className = 'return-link'>Home</Link>
              <Link to='/loginPage' className = 'return-link'>Login</Link>
          </div>
        </section>
    )
}

export default SignUpPage;
