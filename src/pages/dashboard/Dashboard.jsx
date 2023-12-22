import React from 'react';
import Tester from './Tester';
import Loading from '../../util/Loading';

const Dashboard = () => {
  return (
    <>
      <div className='box-white'>
        DASHBOARD
        <Tester />
      </div>
      {/* <Loading/> */}
    </>
  );
};

export default Dashboard;
