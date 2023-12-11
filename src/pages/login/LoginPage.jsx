import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useLogin } from '../../contexts/LoginContext';

export const LoginPageAlert = ({ message }) => {
  return <div className='text-red-500 m-2'>{message}</div>;
};

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const { isLoggedIn, handleLogin } = useLogin();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, []);

  const handleLoginFormSubmit = async () => {
    if (!credentials.username || !credentials.password) {
      setErrorMessage('Invalid input.');
      return;
    }

    const response = await handleLogin(credentials.username, credentials.password);
    if (response.status === 'failed') {
      setErrorMessage(response.message);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-96 h-60 mt-10 p-4 flex flex-col bg-white'>
        <h1>LOGIN</h1>
        <input
          className='my-2 border px-4 py-1'
          value={credentials.username}
          placeholder='username'
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          className='my-2 border px-4 py-1'
          value={credentials.password}
          type='password'
          placeholder='password'
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button className='btn' onClick={handleLoginFormSubmit}>
          LOGIN
        </button>
        {errorMessage.length !== 0 ? <LoginPageAlert message={errorMessage} /> : null}
      </div>
    </div>
  );
};

export default Login;
