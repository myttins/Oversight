import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useMessageBanner } from '../../../contexts/MessageBannerContext';
import axios from 'axios';

const VehiclePaymentRow = ({ payment }) => {
  return (
    <div className="flex w-full">
      <span className="w-1/6">{payment.transaction_id}</span>
      <span className="w-1/6">{payment.description}</span>
      <span className="w-1/6">{payment.amount}</span>
      <span className="w-1/6">{payment.transaction_time}</span>
    </div>
  );
};
const VehiclePayments = () => {
  const { id } = useParams();
  const { showBanner } = useMessageBanner();

  const [payments, setPayments] = useState([]);

  const fetchPaymentsAndSetState = async () => {
    try {
      const response = await axios.get(`/api/payments/${id}`);
      setPayments(response.data);
    } catch (error) {
      console.error(error);
      showBanner({ style: 'error' });
    }
  };

  useEffect(() => {
    fetchPaymentsAndSetState();
  }, [id]);

  return (
    <div className="p-4 bg-white my-4">
      <header>
        {payments.length === 0 ? (
          <>
            <h2>BALANCE: 0</h2>
            <span>NO PAYMENTS</span>
          </>
        ) : (
          <>
            <h2>BALANCE: {payments[0].total_balance}</h2>
            <div className="flex w-full">
              <span className="w-1/6">ID</span>
              <span className="w-1/6">DESCRIPTION</span>
              <span className="w-1/6">AMOUNT</span>
              <span className="w-1/6">DATE</span>
            </div>
            {payments.map((payment) => (
              <VehiclePaymentRow
                key={payment.transaction_id}
                payment={payment}
              />
            ))}
          </>
        )}
      </header>
    </div>
  );
};

export default VehiclePayments;
