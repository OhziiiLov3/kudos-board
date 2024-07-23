import { useState } from "react";
import "../Header/Header.css"
import logo from '../../assets/images/logo.png'
import LoginForm from "../LoginForm/LoginForm";
import UserApi from "../../services/UserApi";
import {useNavigate} from "react-router-dom";

 

const Header = ({isLoggedIn, username, handleLogout,handleLogin }) => {
const [showLoginForm, setShowLoginForm] = useState(false);
const [isLoginMode, setIsLoginMode] = useState(true);
const navigate = useNavigate();





const toggleLoginModal = () =>{
  setShowLoginForm(!showLoginForm)
};

const toggleMode =  () =>{
  setIsLoginMode(!isLoginMode);
}


const closeModal = () => {
  setShowLoginForm(false);
};

const onLogout = async () => {
  try {
    await UserApi.logout();
    handleLogout();
    navigate('/');
  } catch (error) {
    console.error("Logout error:", error);
  }
};



  return (
    <>
    <div className="login-container">
        <a href="#" className="login-toggle" onClick={isLoggedIn ? onLogout  : toggleLoginModal}>
        {isLoggedIn ? `Logout (${username}) ` : isLoginMode ? "Login" : "Register"}
        </a>
    </div>
    <header className="banner">
        <img src={logo} alt="" />
        {showLoginForm && (
          <div className="modal-overlay">
             
          <div className="modal">
            <span className="modal-close" onClick={toggleLoginModal}>
              &times;
            </span>
           <LoginForm isLoginMode={isLoginMode} toggleMode={toggleMode} closeModal={closeModal} setIsLoggedIn={setIsLoggedIn} handleLogin={handleLogin}/>
          </div>
          </div>
        )}
    </header>
        </>
  )
}

export default Header