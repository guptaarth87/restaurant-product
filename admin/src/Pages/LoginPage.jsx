import React, { useState } from "react";
import userCredentials from "./user_credentials";
import {useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === userCredentials.username && password === userCredentials.password) {
      navigate('/category');

      setErrorMessage("");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="container ">
        <br></br>
        <br></br>
        <div className="marginLeftCenter card col-lg-5 col-md-5 col-sm-10 m-2 p-4 ">
      <h2 className="text-center">Login</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br></br>
        <br></br>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
      </div>
    </div>
  );
}

export default LoginPage;
