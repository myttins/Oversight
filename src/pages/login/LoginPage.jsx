import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import LoginPageAlert from './LoginPageAlert';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLoginFormSubmit = async () => {
    if (!credentials.username || !credentials.password) {
      setErrorMessage('Invalid input.');
      return;
    }

    try {
      await axios.post('/api/auth/login', credentials);
      navigate('/');
    } catch (err) {
      setErrorMessage('Login Failed');
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="w-96 h-96 mt-10 outline p-4">
        <h1>LOGIN</h1>
        <input
          className="normal-case border"
          value={credentials.username}
          placeholder="username"
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <input
          className="normal-case border"
          value={credentials.password}
          placeholder="password"
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <button className="btn" onClick={handleLoginFormSubmit}>
          LOGIN
        </button>
        {errorMessage.length !== 0 ? (
          <LoginPageAlert message={errorMessage} />
        ) : null}
      </div>
    </div>
  );
};

export default Login;
