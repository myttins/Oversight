import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const verifyUser = async () => {
    try {
      await axios.get('/api/auth');
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Authentication failed', error);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/'); // Redirect to dashboard or some protected route
    }
  }, [isLoggedIn]);

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
