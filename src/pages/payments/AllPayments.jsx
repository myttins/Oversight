import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { MessageBannerContext } from '../../contexts/MessageBannerContext';
import Loading from '../../util/Loading';
import Table from '../../util/Table';

const NewPayments = () => {
  const [paymentsData, setPaymentsData] = useState([]);
  const { showBanner } = useContext(MessageBannerContext);

  const [loading, setLoading] = useState(true);

  const tableColumns = [
    { title: 'ID', value: 'transaction_id', width: 1, style: '', sort: true },
    { title: 'VEHICLE', value: 'vehicle_id', width: 2, style: 'font-bold', sort: false },
    { title: 'AMOUNT', value: 'amount', width: 2, style: '', sort: false },
    { title: 'DESCRIPTION', value: 'description', width: 4, style: '', sort: false },
    { title: 'TIME', value: 'transaction_time', width: 3, style: 'truncate ', sort: true },
  ];

  const fetchAndSetPayments = async () => {
    try {
      const response = await axios.get('/api/payments');
      setPaymentsData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      showBanner({ style: 'error', message: 'Fetch failed.' });
    }
  };
  useEffect(() => {
    fetchAndSetPayments();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className='bg-white p-4'>
      <header className='py-6 px-4'>
        <h1>PAYMENTS</h1>
      </header>
      <Table columns={tableColumns} data={paymentsData} filter={true} />
    </div>
  );
};

export default NewPayments;
