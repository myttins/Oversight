import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [role, setRole] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get('/api/auth');
        setRole(response.data.user.role);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Authentication failed', error);
        await handleLogout();
      }
    };

    verifyUser();
  }, []);

  const handleLogin = async (user, password) => {
    if (!user || !password) {
      return { status: 'failed', message: 'Invalid input' };
    }

    try {
      const response = await axios.post('/api/auth/login', { username: user, password });
      setIsLoggedIn(true);
      navigate('/');
      setRole(response.data.user.role);
      return { status: 'success' };
    } catch (error) {
      if (error.response.status === 403 && error.response.data.message === 'Password reset required') {
        const { token } = error.response.data;
        navigate('/reset', { state: { token } });
        return { status: 'failed', message: 'Password reset required' };
      }
      return { status: 'failed', message: 'Login failed' };
    }
  };

  const handleReset = async (password, token) => {
    try {
      const response = await axios.post('/api/auth/reset', { password, token });
      setIsLoggedIn(true);
      navigate('/');
      return { status: 'success' };
    } catch (error) {
      console.error(error);
      return { status: 'failed' };
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, handleLogout, role, handleLogin, handleReset }}>
      {children}
    </LoginContext.Provider>
  );
};
