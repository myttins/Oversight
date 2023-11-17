import React, { useState } from 'react';
import { useOutletContext } from 'react-router';
import axios from 'axios';

import translate from '../../../assets/translate';
import PersonCard from '../components/PersonCard';
// import PersonModal from '../components/PersonModal';
import AddPersonButton from '../components/AddPersonButton';

const DriverContainer = (props) => {
  const { language } = useOutletContext();
  const { drivers, setDrivers, vehicleId } = props;

  const handleDriverAdd = async (personInfo) => {
    try {
      // send request to add person to database
      const response = await axios.post(
        `/api/people?type=driver&vehicleid=${vehicleId}&personid=${personInfo.id}`,
        personInfo,
      );
      // add person to state
      const newDrivers = drivers.slice();
      newDrivers.push(personInfo);
      setDrivers(newDrivers);
    } catch (error) {
      console.error(error);
    }
  };

  const updateDriverState = (type, personInfo) => {
    if (type === 'add') {
      const newDrivers = drivers.slice();
      newDrivers.push(personInfo);
      setDrivers(newDrivers);
    } else if (type === 'delete') {
      const newDrivers = drivers.filter(
        (driver) => driver.id !== personInfo.id,
      );
      setDrivers(newDrivers);
    } else if (type === 'edit') {
      const newDrivers = drivers.slice();
      for (let i = 0; i < newDrivers.length; i++){
        if (newDrivers[i].id === personInfo.id) {
          newDrivers[i] = personInfo;
        }
      }
      setDrivers(newDrivers);
    }
  };

  return (
    <div className="border mt-4">
      <div className="flex justify-between">
        <h1 className="text-2xl">
          {language ? translate.driver_info[0] : translate.driver_info[1]}
        </h1>
        <AddPersonButton
          handleSubmit={handleDriverAdd}
          updateContainerState={updateDriverState}
        />
      </div>
      <div>
        {drivers.map((person, i) => {
          return (
            <PersonCard
              key={person.id}
              person={person}
              index={i}
              updateContainerState={updateDriverState}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DriverContainer;
