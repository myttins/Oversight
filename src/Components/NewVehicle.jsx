import React, { useState } from 'react';

const NewVehicle = () => {
  const [driverCount, setDriverCount] = useState(0);

  const mapDriverInputFields = () => {
    return [...Array(driverCount)].map((e, i) => {
      return (
        <div key={i}>
          <input className="m-2 p-2 bg-slate-100" placeholder="name"></input>
        </div>
      );
    });
  };
  return (
    <div>
      <h1>Create New Vehicle</h1>
      <input className="m-2 p-2 bg-slate-100" placeholder="plate"></input>
      <input className="m-2 p-2 bg-slate-100" placeholder="vin"></input>
      <div>
        <button
          className="m-2 p-2 bg-slate-200"
          onClick={() => setDriverCount(driverCount + 1)}
        >
          Add Driver
        </button>
      </div>

      {mapDriverInputFields()}
      <div>
        <button className="m-2 p-2 bg-slate-200">Add</button>
      </div>
    </div>
  );
};

export default NewVehicle;
