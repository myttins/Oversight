import React from 'react';
import { useNavigate } from 'react-router';
import Table from '../../../util/Table';

const VehiclePayments = ({ payments }) => {
  const navigate = useNavigate();

  const handleAddPayment = () => {
    navigate(`new`);
  };

  const tableColumns = [
    { title: 'ID', value: 'transaction_id', width: 2, style: '', sort: true },
    { title: 'DESCRIPTION', value: 'description', width: 4, style: 'truncate', sort: false },
    { title: 'AMOUNT', value: 'amount', width: 2, style: '', sort: true },
    { title: 'DATE', value: 'transaction_time', width: 4, style: 'truncate', sort: true },
  ];

  return (
    <div className='p-4 bg-white my-4'>
      <header className='flex justify-between py-4'>
        <h2>BALANCE: {payments.length === 0 ? '0' : payments[0].total_balance}</h2>
        <button className='btn mx-2' onClick={handleAddPayment}>
          ADD
        </button>
      </header>
      {payments.length === 0 ? (
        <span>NO PAYMENTS</span>
      ) : (
        <Table columns={tableColumns} data={payments} filter={true}/>
      )}
    </div>
  );
};

export default VehiclePayments;
