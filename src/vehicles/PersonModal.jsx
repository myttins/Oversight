import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import translate from '../assets/translate';
import FormElement from './FormElement';

const PersonModal = (props) => {
  const { setModalVisible, newPerson, person } = props;

  const { language } = useOutletContext();

  const labels = [
    'id_number',
    'name',
    'current_address',
    'phone_number',
    'driver_license_number',
    'business_license_number',
    'service_card_number',
  ];

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white relative w-8/12 h-5/6 p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="btn absolute top-4 right-4"
          onClick={handleCloseModal}
        >
          X
        </button>
        <h1 className="text-2xl">{newPerson ? 'ADD PERSON' : 'PERSON INFO'}</h1>

        {labels.map((label) => {
          return <FormElement key={label} label={label} formInfo={person} />;
        })}

        <div>ADD DATE</div>
        <button className="btn">ADD</button>
      </div>
    </div>
  );
};

export default PersonModal;
