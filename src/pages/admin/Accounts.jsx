import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '../../util/Table';
import { useMessageBanner } from '../../contexts/MessageBannerContext';
import { useNavigate } from 'react-router';
import Loading from '../../util/Loading';

export const roles = {
  5: 'SUPER ADMIN W/ LOGS, SQL QUERY, DEV INFO',
  4: 'ADMIN W/ ACCOUNT CONTROL',
  3: 'ADMIN W/ WRITE ACCESS',
  2: 'USER WITH SPECIFIC WRITE ACCESS',
  1: 'READ ONLY',
};

const Accounts = () => {
  const { showBanner } = useMessageBanner();
  const navigate = useNavigate();
  const [accountsList, setAccountsList] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelectedAccounts(accountsList.filter((account) => account.checked === true));
  }, [accountsList]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`/api/auth/accounts`);
        setAccountsList(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAccounts();
  }, []);

  const handleManage = () => {
    if (selectedAccounts.length !== 1) {
      showBanner({ style: 'error', message: 'Invalid items selected' });
      return;
    }
  };

  const tableColumns = [
    { title: 'ID', value: 'id', width: 1, style: '', sort: true },
    { title: 'USERNAME', value: 'username', width: 3, style: '', sort: true },
    { title: 'ROLE', value: 'role', width: 1, style: '', sort: true },
    { title: 'RESET', value: 'reset', width: 1, style: '', sort: true },
    { title: 'DATE CREATED', value: 'date_created', width: 6, style: '', sort: true },
  ];

  if (loading) return <Loading />;

  return (
    <div className='box-white'>
      <h1>INFO</h1>
      <div>
        <div>ROLES</div>
        <div>5: {roles['5']} </div>
        <div>4: {roles['4']}</div>
        <div>3: {roles['3']}</div>
        <div>2: {roles['2']}</div>
        <div>1: {roles['1']}</div>
        <div>0: NONE</div>
      </div>
      <div className='my-4'>
        <div className='flex justify-between'>
          <h2>ACCOUNTS</h2>
          <div className='space-x-4'>
            {selectedAccounts.length === 1 && (
              <button className='btn' onClick={handleManage}>
                MANAGE
              </button>
            )}
            <button className='btn' onClick={() => navigate('/admin/add')}>
              ADD
            </button>
            <button className='btn'>DELETE</button>
          </div>
        </div>
        <Table data={accountsList} setData={setAccountsList} columns={tableColumns} checkbox={true} filter={true} />
      </div>
    </div>
  );
};

export default Accounts;
