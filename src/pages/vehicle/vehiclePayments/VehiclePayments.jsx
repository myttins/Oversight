import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useMessageBanner } from '../../../contexts/MessageBannerContext';
import axios from 'axios';
import Loading from '../../../util/Loading';

const VehiclePaymentRow = ({ payment }) => {
  return (
    <div className='flex w-full'>
      <span className='w-1/6'>{payment.transaction_id}</span>
      <span className='w-2/6'>{payment.description}</span>
      <span className='w-1/6'>{payment.amount}</span>
      <span className='w-2/6'>{payment.transaction_time}</span>
    </div>
  );
};
const VehiclePayments = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showBanner } = useMessageBanner();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchPaymentsAndSetState = async () => {
    try {
      const response = await axios.get(`/api/payments/${id}`);
      setPayments(response.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
      showBanner({ style: 'error' });
    }
  };

  useEffect(() => {
    fetchPaymentsAndSetState();
  }, [id]);

  const handleAddPayment = () => {
    navigate(`new`);
  };

  return (
    <div className='p-4 bg-white my-4'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <header className='flex justify-between'>
            <h2>BALANCE: {payments.length === 0 ? '0' : payments[0].total_balance}</h2>
            <button className='btn mx-2' onClick={handleAddPayment}>
              ADD
            </button>
          </header>
          {payments.length === 0 ? (
            <span>NO PAYMENTS</span>
          ) : (
            <>
              <div className='flex w-full'>
                <span className='w-1/6'>ID</span>
                <span className='w-2/6'>DESC.</span>
                <span className='w-1/6'>AMOUNT</span>
                <span className='w-2/6'>DATE</span>
              </div>
              {payments.map((payment) => (
                <VehiclePaymentRow key={payment.transaction_id} payment={payment} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default VehiclePayments;
