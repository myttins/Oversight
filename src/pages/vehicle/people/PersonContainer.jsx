import React, { useContext, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { VehicleContext } from '../VehicleContainer.jsx';

import axios from 'axios';

import translate from '../../../assets/translate.js';
import AddPersonButton from './AddPersonButton.jsx';
import PersonCard from './PersonCard.jsx';

const PersonContainer = (props) => {
  const { language } = useOutletContext();
  const { people, setPeople, driverOrOwner } = props;

  const vehicleId = useContext(VehicleContext);

  const navigate = useNavigate();

  const handleDelete = async (person) => {
    try {
      const response = await axios.delete(
        `/api/people?type=${driverOrOwner}&vehicleid=${vehicleId}&personid=${person.id}`,
      );
      setPeople((prevPeople) =>
        prevPeople.filter((prev) => prev.id !== person.id),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    navigate(`/profile/new?redirect=true&to=vehicle&path=${vehicleId}&person=${driverOrOwner}`)
  }

  return (
    <div className="border rounded-md my-4 p-4 bg-white">
      <div className="flex justify-between">
        {driverOrOwner === 'driver' ? (
          <h2>
            {language ? translate.driver_info[0] : translate.driver_info[1]}
          </h2>
        ) : (
          <h2>
            {language ? translate.owner_info[0] : translate.owner_info[1]}
          </h2>
        )}
        {(driverOrOwner === 'driver' || people.length === 0) && (
          <button className={'btn'} onClick={handleAdd}>ADD</button>
        )}
      </div>
      <div>
        {people.map((person, i) => {
          return (
            <PersonCard
              key={i}
              person={person}
              driverOrOwner={driverOrOwner}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PersonContainer;
