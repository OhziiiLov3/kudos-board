import {useEffect } from 'react'


const AuthRoute = ({children, isLoggedIn, openLoginModal}) => {
    
    useEffect(()=> {
        if(!isLoggedIn){
            openLoginModal();
        }
    },[isLoggedIn, openLoginModal])
  return isLoggedIn ? children : null
    
  
}

export default AuthRoute;