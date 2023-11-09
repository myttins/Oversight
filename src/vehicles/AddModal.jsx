import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import translate from '../assets/translate';
import FormElement from './FormElement';
import names from '../assets/names';

const AddModal = (props) => {
  const { showModal } = props;

  const [suggestions, setSuggestions] = useState([]);

  const [language] = useOutletContext();


  useEffect(() => {
    setSuggestions(names)
  }, [])

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => showModal(false)}
    >
      <div
        className="bg-white relative w-8/12 h-5/6 p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="btn absolute top-1 right-1"
          onClick={() => showModal(false)}
        >
          X
        </button>
        <h1 className="text-2xl">ADD PERSON</h1>
        <FormElement label={'id_number'} /> 

        <button className='btn'>SEARCH FOR PRE-EXISTING</button>
        <FormElement label={'name'} />
        <FormElement label={'current_address'} />
        <FormElement label={'phone_number'} />
        <FormElement label={'driver_license_number'} />
        <FormElement label={'business_license_number'} />
        <FormElement label={'service_card_number'} />
        <div>ADD DATE</div>
        <button className="btn">ADD</button>
      </div>
    </div>
  );
};

export default AddModal;
