import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLogin } from '../../contexts/LoginContext';

const Accounts = () => {
  const { role } = useLogin();
  const [accountsList, setAccountsList] = useState([]);
  
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`/api/auth/accounts?role=${role}`);
      } catch (error) {}
    };
  }, []);
  return (
    <div className='box-white'>
      <h1>ACCOUNTS</h1>
      <div>
        <div>ROLES</div>
        <div>5: SUPER ADMIN W/ LOGS, SQL QUERY, DEV INFO</div>
        <div>4: ADMIN W/ ACCOUNT CONTROL</div>
        <div>3: ADMIN W/ WRITE ACCESS</div>
        <div>2: USER WITH SPECIFIC WRITE ACCESS</div>
        <div>1: READ ONLY </div>
        <div>0: NONE</div>
      </div>
    </div>
  );
};

export default Accounts;
