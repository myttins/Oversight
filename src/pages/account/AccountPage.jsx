import React from 'react';
import { useLogin } from '../../contexts/LoginContext';
import { roles } from '../admin/Accounts';

const AccountPage = () => {
  const { role, username } = useLogin();

  if (!role || !username) return null;

  return (
    <div className='box-white'>
      <h2>USERNAME: {username}</h2>
      <h2>
        ROLE: {role}- {roles[role]}
      </h2>
    </div>
  );
};

export default AccountPage;
