import { GoogleLogout } from "react-google-login";


const GoogleAuthLogout=()=>{
    const clientId='357719118226-3lm1vji9jfv4dfgql090p4kefdg504dt.apps.googleusercontent.com'
    
    const onSuccess=()=>{
       console.log('logout code insert here')
    }
    
    return(
        <div id='signOutButton'>
            <GoogleLogout
                clientId={clientId}
                buttonText={'Logout'}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}
export default GoogleAuthLogout;