import React, { useContext, useEffect, useMemo, useState } from 'react';
import { MessageBannerContext } from '../../../contexts/MessageBannerContext';
import axios from 'axios';
import Table from '../../../util/Table';

const Schedules = () => {
  const [data, setData] = useState([]);
  const { showBanner } = useContext(MessageBannerContext);

  const tableColumns = [
    { title: 'ID', value: 'schedule_id', width: 1, style: '', sort: true },
    { title: 'LABEL', value: 'label', width: 2, style: 'truncate', sort: false },
    { title: 'AMOUNT', value: 'amount', width: 2, style: '', sort: true },
    { title: 'DESCRIPTION', value: 'description', width: 4, style: 'truncate', sort: true },
    { title: 'CREATED', value: 'date_created', width: 3, style: 'truncate', sort: true },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/payments/schedules');
      setData(response.data);
    } catch (error) {
      console.error(error);
      // Type narrowing to check if error is an AxiosError
      if (axios.isAxiosError(error)) {
        showBanner({ style: 'error', message: error.response.data.message });
      } else {
        // Handle non-Axios errors
        showBanner({ style: 'error', message: 'An unexpected error occurred' });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='box-white'>
      <header>
        <h1>FEE SCHEDULES</h1>
      </header>
      <div className='py-4'>
        <Table columns={tableColumns} data={data} filter={true} />
      </div>
    </div>
  );
};

export default Schedules;
