import {GoogleLogin} from 'react-google-login';

const GoogleAuthLogin =()=>{
    const clientId='357719118226-3lm1vji9jfv4dfgql090p4kefdg504dt.apps.googleusercontent.com'
    
    const onSuccess=(res)=>{
        console.log('login successfull: current user',res.profileObj)
    }
    
    const onFailure=(res)=>{
        console.log('login failed',res)
    }
    return(
        <div id ='signInButton'>
            <GoogleLogin
                clientId={clientId}
                buttonText='Sign in with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />

        </div>
    )
}
export default GoogleAuthLogin;