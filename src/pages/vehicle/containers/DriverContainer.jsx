import React from 'react';
import { useOutletContext } from 'react-router';
import axios from 'axios';

import translate from '../../../assets/translate';
import PersonCard from '../components/PersonCard';

const DriverContainer = (props) => {
  const { language } = useOutletContext();
  const { drivers, setDrivers } = props;

  const handleDelete = async (e, id) => {
    // send request to remove person server-side
    e.stopPropagation();
    const response = await axios.delete(
      `/api/people?type=driver&id=${id}`,
    );

    // remove person from state
    const newDrivers = drivers.filter((driver) => driver.foreign_id !== id);
    setDrivers(newDrivers);
  };

  return (
    <div className="border mt-4">
      <div className="flex justify-between">
        <h1 className="text-2xl">
          {language ? translate.driver_info[0] : translate.driver_info[1]}
        </h1>
        <button className="btn">+</button>
      </div>
      <div>
        {drivers.map((person, i) => {
          return (
            <PersonCard
              key={person.id}
              person={person}
              index={i}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DriverContainer;
