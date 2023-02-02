//DEPENDENCIES
import {useEffect} from 'react';
import {gapi} from 'gapi-script';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';

//COMPONENTS
import GoogleAuthLogin from '../components/GoogleAuthLogin.js';
import GoogleAuthLogout from '../components/GoogleAuthLogout.js';

//CSS
import '../css/General.css';
import '../css/LoginPage.css';
import '../css/Media.css';

//IMAGES
import LoginImage from '../images/loginimage.png';
import RecipeMomLogo from '../images/recipemomlogo.gif'
function LoginPage() {
    const clientId='357719118226-3lm1vji9jfv4dfgql090p4kefdg504dt.apps.googleusercontent.com'

    useEffect(()=>{
        function start(){
            gapi.client.init({
                clientId: clientId,
                scope:''
            })
        }

        gapi.load('client:auth2',start)
    })

    //MANUAL LOGIN
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword,setShowPassword]=useState('password');
    const [errorMessage,setErrorMessage]=useState('');

    //check if a user is already logged In
    //userId is the container named for the user Details in local Storage
    const userLoggedIn=localStorage.getItem('userId');//obtain what is in localStorage
    if(userLoggedIn!==null){
        navigate('/');
    }

    const login = (e) => {
        e.preventDefault();
        const configuration={
            method: 'post',
            url: 'https://recipemom-api.onrender.com/api/v1/users/login',
            // url: 'http://localhost:8080/api/v1/users/login',
            data:{
                email,
                password
            }
        }
        axios(configuration)
        .then((result)=>{

            //check if the login is valid
            if(result.data.status=='Valid crendentials'){
                /*why did I capture per item the user details? 
                it's because if you are going to console log, the data below, it is a string, not an array*/
                localStorage.setItem('userId',result.data.id);
                localStorage.setItem('userFirstName',result.data.firstName);
                localStorage.setItem('userLastName',result.data.lastName);
                localStorage.setItem('userEmail',result.data.email);
                localStorage.setItem('userPicture',result.data.pictureLink);
                navigate('/')
            }else{
                setErrorMessage('Wrong Email or Password');
            }
        })
    }

    const onShowPassword =(e)=>{
        if(e.target.checked){
            setShowPassword('text');
        }else{
            setShowPassword('password');
        }
    }

    return (
        <section className='login-page-container'>
            <div className='image-container'>
                <img src={LoginImage}/>
            </div>
            <div className='form-container'>
                <div>
                    <img src={RecipeMomLogo}/>
                </div>

                <div>
                    <form onSubmit={(e)=>login(e)}
                        className='login-form'
                    >
                        <table>                        
                            <tr>
                                <td><label htmlFor='email'>Email: </label></td>
                                <td>
                                    <input
                                        type="email"
                                        onChange={(e) => setEmail((e.target.value).toLowerCase())}
                                        value={email}
                                        placeholder="Email"
                                        required
                                        name='email'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor='password'>Password: </label></td>
                                <td>
                                    <input
                                        type={showPassword}
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        placeholder="Password"
                                        name='password'
                                        required
                                        />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor='showPassword'>Show Password</label></td>
                                <td> 
                                    <input 
                                        type = 'checkbox'
                                        name='showPassword'
                                        onChange={onShowPassword}
                                        className='show-password'
                                        />
                                </td>
                            </tr>
                            <tr>
                                <td className='error-message'>{errorMessage}</td>
                                <td colspan='2'><button type="submit" >Login</button></td>
                            </tr>

                            
                            
                        </table>
                    </form>

                </div>
                <div className='no-account-container'>
                    <div className='one'>
                        <h5>Don't have an account?</h5>
                    </div>
                    <div className='two'>
                        <div><Link className='links' to ='/signUpPage'>Sign Up Here</Link></div>
                        <div><Link className='links'to='/'>Return Home</Link></div>
                    </div>
                    <div>
                        <GoogleAuthLogin className='links'/>
                    </div>
                    
                </div>
                
            </div>
        </section>
        )
}

export default LoginPage;
