import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { MessageBannerContext } from '../../contexts/MessageBannerContext';
import Loading from '../../util/Loading';

const PaymentsRow = ({ payment }) => {
  const { transaction_id, vehicle_id, amount, description, transaction_time } = payment;

  return (
    <div className='flex w-full'>
      <span className='w-1/6'>{transaction_id}</span>
      <span className='w-1/6'>{vehicle_id}</span>
      <span className='w-1/6'>{amount}</span>
      <span className='w-1/6'>{description}</span>
      <span className='w-2/6'>{transaction_time}</span>
    </div>
  );
};

const NewPayments = () => {
  const [paymentsData, setPaymentsData] = useState([]);
  const { showBanner } = useContext(MessageBannerContext);

  const [loading, setLoading] = useState(true);

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
      <header>
        <h1>PAYMENTS</h1>
      </header>
      <div className='flex w-full'>
        <span className='w-1/6'>ID</span>
        <span className='w-1/6'>VEHICLE</span>
        <span className='w-1/6'>AMOUNT</span>
        <span className='w-1/6'>DESCRIPTION</span>
        <span className='w-2/6'>TIME</span>
      </div>
      {paymentsData.map((payment) => (
        <PaymentsRow key={payment.transaction_id} payment={payment} />
      ))}
    </div>
  );
};

export default NewPayments;
