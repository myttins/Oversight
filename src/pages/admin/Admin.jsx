import React from 'react';
import { Outlet } from 'react-router';
import { useLogin } from '../../contexts/LoginContext';
import Error from '../../util/error/Error';
import Loading from '../../util/Loading';

const Admin = () => {
  const { role } = useLogin();

  if (!role) return <Loading />;

  if (role < 4) return <Error status={'UNAUTHORIZED'} />;

  return (
    <>
      <div className='box-white '>
        <h1>ADMIN</h1>
        <div>
          <button className='btn'>ACCOUNTS</button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Admin;
