import React, { useContext, useState } from 'react';
import { useOutletContext } from 'react-router';
import { VehicleContext } from '../VehicleContainer.jsx';

import axios from 'axios';

import translate from '../../../assets/translate.js';
import PersonCard from './PersonCard.jsx';
import AddPersonButton from './AddPersonButton.jsx';

const PersonContainer = (props) => {
  const { language } = useOutletContext();
  const { people, setPeople, driverOrOwner } = props;

  const vehicleId = useContext(VehicleContext);

  const updatePersonState = (type, personInfo) => {
    if (type === 'add') {
      const newPeople = people.slice();
      newPeople.push(personInfo);
      setPeople(newPeople);
    } else if (type === 'delete') {
      const newPeople = people.filter((driver) => driver.id !== personInfo.id);
      setPeople(newPeople);
    } else if (type === 'edit') {
      const newPeople = people.slice();
      for (let i = 0; i < newPeople.length; i++) {
        if (newPeople[i].id === personInfo.id) {
          newPeople[i] = personInfo;
        }
      }
      setPeople(newPeople);
    }
  };

  return (
    <div className="border p-4 m-4 bg-white">
      <div className="flex justify-between">
        {driverOrOwner === 'driver' ? (
          <h1 className="text-2xl">
            {language ? translate.driver_info[0] : translate.driver_info[1]}
          </h1>
        ) : (
          <h1 className="text-2xl">
            {language ? translate.owner_info[0] : translate.owner_info[1]}
          </h1>
        )}

        {(driverOrOwner === 'driver' || people.length === 0) && (
          <AddPersonButton
            updateContainerState={updatePersonState}
            driverOrOwner={driverOrOwner}
          />
        )}
      </div>
      <div>
        {people.map((person, i) => {
          return (
            <PersonCard
              key={person.id}
              person={person}
              driverOrOwner={driverOrOwner}
              updateContainerState={updatePersonState}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PersonContainer;
