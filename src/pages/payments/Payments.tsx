import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Payment {
  transaction_id: string;
  vehicle_id: number;
  amount: number;
  description: string;
  transaction_time: string;
}

type PaymentRowProps = {
  payment: Payment
}

const PaymentsRow: React.FC<PaymentRowProps> = ({ payment }) => {
  const { transaction_id, vehicle_id, amount, description, transaction_time } =
    payment;

  return (
    <div className="flex w-full">
      <span className="w-1/6">{transaction_id}</span>
      <span className="w-1/6">{vehicle_id}</span>
      <span className="w-1/6">{amount}</span>
      <span className="w-1/6">{description}</span>
      <span className="w-2/6">{transaction_time}</span>
    </div>
  );
};

const Payments = () => {
  const [paymentsData, setPaymentsData] = useState([]);

  const fetchAndSetPayments = async () => {
    try {
      const response = await axios.get('/api/payments');
      setPaymentsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAndSetPayments();
  }, []);
  return (
    <div className="bg-white p-4">
      <header>
        <h1>PAYMENTS</h1>
      </header>
      <div className="flex w-full">
        <span className="w-1/6">ID</span>
        <span className="w-1/6">VEHICLE</span>
        <span className="w-1/6">AMOUNT</span>
        <span className="w-1/6">DESCRIPTION</span>
        <span className="w-2/6">TIME</span>
      </div>
      {paymentsData.map((payment) => (
        <PaymentsRow payment={payment} />
      ))}
    </div>
  );
};

export default Payments;
