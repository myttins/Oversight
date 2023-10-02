import React from 'react';

const VehicleRow = (props) => {
  const { data } = props;

  return (
    <div
      className="flex w-full cursor-pointer py-2"
      //   onClick={() => navigate(`/vehicle/${data.id}`)}
    >
      <a className="w-2/6 min-w-min">{data.plate}</a>
      <a className="w-1/6 min-w-min">{data.year}</a>
      <a className="w-1/6 min-w-min">{data.model}</a>
    </div>
  );
};

export default VehicleRow;
