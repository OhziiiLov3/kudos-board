// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect} from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import SpacePage from "./components/SpacePage/SpacePage";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import LoginForm from "./components/LoginForm/LoginForm";
import UserApi from "./services/UserApi";


function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  
useEffect(()=>{
  const checkLoggedIn = async () =>{

    const token = localStorage.getItem('token');
    if(token){
      setIsLoggedIn(true);
      try {
        const user = await UserApi.getCurrentUser();
        setUsername(user.username)
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    }
  };
  checkLoggedIn();
  },[])
 
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem("username", username);
    closeLoginModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  };
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={<Dashboard 
              openLoginModal={openLoginModal} 
              isLoggedIn={isLoggedIn}
                username={username}
                handleLogout={handleLogout}
              />}
          />
          <Route
            path="/spaces/:id"
            element={
              <AuthRoute openLoginModal={openLoginModal}>
                <SpacePage />
              </AuthRoute>
            }
          />
          <Route
            path="/login"
            element={
              <LoginForm
                isLoginMode={isLoginMode}
                toggleMode={toggleMode}
                closeModal={closeLoginModal}
                setIsLoggedIn={setIsLoggedIn}
                handleLogin={handleLogin}
              />
            }
          />
        </Routes>
        <div className="sign-up-container">
        {isLoginModalOpen && (
           <div className="modal-overlay">
            <div className="modal">
            <span className="modal-close" onClick={closeLoginModal}>
              &times;
            </span>
          <LoginForm 
              isLoginMode={isLoginMode}
              toggleMode={toggleMode}
              closeModal={closeLoginModal}
              handleLogin={handleLogin}
              setIsLoggedIn={setIsLoggedIn}
              />
              </div>
            </div>
        )}
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
