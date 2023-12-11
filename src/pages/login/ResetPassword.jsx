import React, { useEffect, useState } from 'react';
import { useLogin } from '../../contexts/LoginContext';
import { useLocation, useNavigate } from 'react-router';
import { LoginPageAlert } from './LoginPage';

const ResetPassword = () => {
  const location = useLocation();
  const { token } = location.state || {};
  const navigate = useNavigate();
  const { handleReset } = useLogin();

  const [credentials, setCredentials] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  const handleResetPasswordAndLogin = async () => {
    if (credentials.newPassword !== credentials.confirmNewPassword) {
      setErrorMessage('Passwords incorrect');
      return;
    }
    try {
      const response = await handleReset(credentials.newPassword, token);
      if (response.status !== 'success') {
        setErrorMessage('Password reset failed');
      }
    } catch (error) {
      setErrorMessage('Password reset failed');
    }
  };
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-96 h-76 mt-10 p-4 flex flex-col bg-white'>
        <h1>RESET PASSWORD</h1>
        <input
          className='my-2 border px-4 py-1'
          value={credentials.newPassword || ''}
          type='password'
          placeholder='new password'
          onChange={(e) => setCredentials({ ...credentials, newPassword: e.target.value })}
        />
        <input
          className='my-2 border px-4 py-1'
          value={credentials.confirmNewPassword || ''}
          type='password'
          placeholder='confirm password'
          onChange={(e) => setCredentials({ ...credentials, confirmNewPassword: e.target.value })}
        />
        <button className='btn' onClick={handleResetPasswordAndLogin}>
          LOGIN
        </button>
        {errorMessage.length !== 0 ? <LoginPageAlert message={errorMessage} /> : null}
      </div>
    </div>
  );
};

export default ResetPassword;
