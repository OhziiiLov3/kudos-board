import { useState } from "react";
import authApi from "../../services/UserApi";
import "../LoginForm/LoginForm.css";


const LoginForm = ({ isLoginMode, toggleMode, closeModal, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        const response = await authApi.login(email, password);
        console.log("Login Response:", response);
        const {user_id, token} = response;
        console.log("Login Successful:", token);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user_id);
        // setIsLoggedIn(true);
        handleLogin(email);
        closeModal();

      } else {
        const response = await authApi.register(email, username, password);
        console.log("Registration successful:", response);

        // Login user after register
        const loginResponse = await authApi.login(email, password);
        console.log("Login after registration:", loginResponse);
        const {user_id, token} = loginResponse;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user_id);
        // setIsLoggedIn(true);
        handleLogin(email);
        closeModal();
    }
    } catch (error) {
     
            const errorMessage = error.message || "An unknown error occurred.";
      setError(errorMessage);
      console.log("Error message set to:", errorMessage);

    }
  };
  return (
    <div>
      <div className="login-form">
        <h2>{isLoginMode ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
           {!isLoginMode && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
           )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="button-group">

          <button type="submit">{isLoginMode ? "Login" : "Register"}</button>
          <button type="button" onClick={toggleMode}>
            {isLoginMode ? "Register" : "Login Here"}
          </button>
          </div>
          <p className="login-message">
  {isLoginMode ? "Don't Have an account ?" : "Already have an account ?"}
</p>
{error && <p className="error-message">{error}</p>}

        </form>
      </div>
    </div>
  );
};

export default LoginForm;
