import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';

const Vehicle = ({ plate }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <div className="p-4 bg-white">
        <header>
          <h1>VEHICLE {id}</h1>
        </header>
        <button className="btn" onClick={() => navigate(`/vehicle/${id}/info`)}>
          INFO
        </button>
        <button
          className="btn ml-2"
          onClick={() => navigate(`/vehicle/${id}/payments`)}
        >
          PAYMENTS
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Vehicle;
