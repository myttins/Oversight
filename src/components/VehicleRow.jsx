import React from 'react';
import { useNavigate } from 'react-router';

const VehicleRow = (props) => {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <div
      className="flex w-full cursor-pointer py-2 hover:bg-slate-100"
        onClick={() => navigate(`/vehicle/${data.id}`)}
    >
      <a className="w-1/6 min-w-min">{data.plate}</a>
      <a className="w-2/6 min-w-min">{data.owner_name}</a>
      <a className="w-3/6 min-w-min">{data.driver_name}</a>
    </div>
  );
};

export default VehicleRow;
