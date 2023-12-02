import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { MessageBannerContext } from '../../contexts/MessageBannerContext';
import Loading from '../../util/Loading';

const PaymentsRow = ({ payment }) => {
  const { transaction_id, vehicle_id, amount, description, transaction_time } = payment;

  return (
    <div className='flex w-full py-3 px-2 border-t text-zinc-700 text-sm hover:scale-[1.01] hover:bg-zinc-50 transition-transform duration-300'>
      <span className='w-1/12 pl-2'>{transaction_id}</span>
      <span className='w-1/6 pl-2 font-bold'>{vehicle_id}</span>
      <span className={`w-1/6 pl-2 ${amount[0] === '-' ? 'text-green-500' : ''}`}>{'CN¥ ' + amount}</span>
      <span className='w-2/6 pl-2 truncate'>{description}</span>
      <span className='w-1/6 pl-2 truncate'>{transaction_time}</span>
      <span className='w-1/12 pl-2'></span>
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
      <header className='py-6 px-4'>
        <h1>PAYMENTS</h1>
      </header>
      <div className='p-2'>
        <div className='flex w-full bg-zinc-100 p-2'>
          <span className='w-1/12 pl-2 font-bold'>ID</span>
          <span className='w-1/6 pl-2 font-bold'>VEHICLE</span>
          <span className='w-1/6 pl-2 font-bold'>AMOUNT</span>
          <span className='w-2/6 pl-2 font-bold'>DESCRIPTION</span>
          <span className='w-1/6 pl-2 font-bold'>TIME</span>
          <span className='w-1/12 pl-2 font-bold'></span>
        </div>
        {paymentsData.map((payment) => (
          <PaymentsRow key={payment.transaction_id} payment={payment} />
        ))}
      </div>
    </div>
  );
};

export default NewPayments;
