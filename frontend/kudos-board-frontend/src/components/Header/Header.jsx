import { useState } from "react";
import "../Header/Header.css"
import logo from '../../assets/images/logo.png'
import LoginForm from "../LoginForm/LoginForm";
import UserApi from "../../services/UserApi";

 

const Header = () => {
const [showLoginForm, setShowLoginForm] = useState(false);
const [isLoginMode, setIsLoginMode] = useState(true);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userEmail, setUserEmail] = useState("");


const toggleLoginModal = () =>{
  setShowLoginForm(!showLoginForm)
};

const toggleMode =  () =>{
  setIsLoginMode(!isLoginMode);
}


const closeModal = () => {
  setShowLoginForm(false);
};

const handleLogout = async () => {
  try {
    await UserApi.logout();
    setIsLoggedIn(false);
    setUserEmail("");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

const handleLogin = (username) => {
  setUserEmail(username); // Set user email on successful login
  setIsLoggedIn(true);
};

  return (
    <>
    <div className="login-container">
        <a href="#" className="login-toggle" onClick={isLoggedIn ? handleLogout : toggleLoginModal}>
        {isLoggedIn ? `Logout (${userEmail})` : isLoginMode ? "Login" : "Register"}
        </a>
    </div>
    <header className="banner">
        <img src={logo} alt="" />
        {showLoginForm && (
          <div className="modal-overlay">
              <div className="modal-overlay">
          <div className="modal">
            <span className="modal-close" onClick={toggleLoginModal}>
              &times;
            </span>
           <LoginForm isLoginMode={isLoginMode} toggleMode={toggleMode} closeModal={closeModal} setIsLoggedIn={setIsLoggedIn} handleLogin={handleLogin}/>
          </div>
        </div>
          </div>
        )}
    </header>
        </>
  )
}

export default Header