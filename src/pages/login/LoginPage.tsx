import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

type LoginPageAlertProps = {
  message: string;
};
const LoginPageAlert: React.FC<LoginPageAlertProps> = ({ message }) => {
  return <div className="border bg-red-300">{message}</div>;
};

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
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-96 h-96 mt-10 p-4 flex flex-col bg-white">
        <h1>LOGIN</h1>
        <input
          className="my-2 border px-4 py-1 focus:outline"
          value={credentials.username}
          placeholder="username"
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <input
          className="my-2 border px-4 py-1"
          value={credentials.password}
          type='password'
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
