import React, { useContext, useEffect, useMemo, useState } from 'react';
import { MessageBannerContext } from '../../../contexts/MessageBannerContext';
import axios  from 'axios';
import Table from '../../../util/Table';

const Schedules = () => {
  const [data, setData] = useState([]);
  const { showBanner } = useContext(MessageBannerContext);

  const tableColumns = [
    { title: 'ID', value: 'schedule_id', width: 2, style: '', sort: true },
    { title: 'LABEL', value: 'label', width: 4, style: 'truncate', sort: false },
    { title: 'AMOUNT', value: 'amount', width: 2, style: '', sort: true },
    { title: 'CREATED', value: 'date_created', width: 4, style: 'truncate', sort: true },
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
    <div className='bg-white p-4'>
      <header className='py-6 px-4'>
        <h1>FEE SCHEDULES</h1>
      </header>
      <Table columns={tableColumns} data={data} filter={true} />
    </div>
  );
};

export default Schedules;
