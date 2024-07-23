// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import SpacePage from "./components/SpacePage/SpacePage";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    closeLoginModal();
  };
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={<Dashboard openLoginModal={openLoginModal} />}
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
