import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleLoginFormSubmit = () => {
    if (username === 'test') {
      localStorage.setItem('token', 'password');
      navigate('/');
    } else {
      console.log('login failed')
      return;
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="w-96 h-96 mt-10 outline p-4">
        <h1>LOGIN</h1>
        <input
          className="normal-case border"
          value={username}
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className='btn' onClick={handleLoginFormSubmit}>LOGIN</button>
      </div>
    </div>
  );
};

export default Login;
