import React, { useState } from 'react';

const NewVehicle = () => {
  const [drivers, setDrivers] = useState([]);
  const [plate, setPlate] = useState('');
  const [vin, setVin] = useState('');

  const mapDriverInputFields = () => {
    return drivers.map((e, i) => {
      return (
        <div key={i}>
          <input
            className="m-2 p-2 bg-slate-100"
            id={i}
            placeholder="name"
            onChange={(e) => {
              const newDrivers = drivers.slice();
              newDrivers[i].name = e.target.value;
              setDrivers(newDrivers)
            }}
          ></input>
        </div>
      );
    });
  };
  return (
    <div>
      <h1>Create New Vehicle</h1>
      <input className="m-2 p-2 bg-slate-100" placeholder="plate" onChange={(e) => setPlate(e.target.value)}></input>
      <input className="m-2 p-2 bg-slate-100" placeholder="vin" onChange={(e) => setVin(e.target.value)}></input>
      <div>
        <button
          className="m-2 p-2 bg-slate-200"
          onClick={() => {
            const newDrivers = drivers.slice();
            newDrivers.push({ name: '' });
            setDrivers(newDrivers);
          }}
        >
          Add Driver
        </button>
      </div>
      {mapDriverInputFields()}
      <div>
        <button className="m-2 p-2 bg-slate-200" onClick={() => {
          console.log(drivers, vin, plate)
        }}>Add</button>
      </div>
    </div>
  );
};

export default NewVehicle;
