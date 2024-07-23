import {useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const AuthRoute = ({children, isLoggedIn, openLoginModal}) => {
    const navigate = useNavigate();
    useEffect(()=> {
        if(!isLoggedIn){
            openLoginModal();
            navigate("/");
        }
    },[isLoggedIn, openLoginModal, navigate])
  return isLoggedIn ? children : null
    
  
}

export default AuthRoute;