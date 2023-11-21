import React, { useContext, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import axios from 'axios';
import { VehicleContext } from '../VehicleContainer';

import translate from '../../../assets/translate';
import FormElement from '../util/FormElement';
import ErrorMessage from '../../../error/ErrorMessage';

const AddPersonModal = (props) => {
  const { handleCloseModal, updateContainerState, driverOrOwner } = props;

  const [personInfo, setPersonInfo] = useState({});
  const [inputMethod, setInputMethod] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { language } = useOutletContext();

  const vehicleId = useContext(VehicleContext);

  const labels = [
    'name',
    'current_address',
    'phone_no',
    'driv_lic_no',
    'business_lic_no',
    'service_card_no',
  ];

  // TODO add verification check that the input ID does not exist already to avoid adding duplicate persons
  const handleFormSubmit = async () => {
    // validate data
    if (!validateInputData(personInfo)) return;

    if (!inputMethod) {
      const data = await fetchPerson(personInfo.id);
      if (data.length !== 0) {
        setErrorMessage('ID already exists. Use Fill');
      }
    }

    try {
      await axios.post(
        `/api/people?input=${inputMethod}&type=${driverOrOwner}&vehicleid=${vehicleId}&personid=${personInfo.id}`,
        personInfo,
      );

      // update state, either add new, update existing, add existing
      updateContainerState('add', personInfo);

      // close modal
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePersonLookup = async () => {
    if (!validateInputData(personInfo)) return;

    try {
      const data = await fetchPerson(personInfo.id);
      if (data.length === 0) {
        setPersonInfo({ id: personInfo.id });
        setErrorMessage('No Person Found. Manual Input.');
      } else {
        setPersonInfo(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPerson = async (personid) => {
    try {
      const response = await axios.get(`/api/people/${personid}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const validateInputData = (personInfo) => {
    if (!personInfo.id) {
      setErrorMessage('Invalid input');
      return false;
    }

    // TODO check to see if person already exists

    return true;
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => {
        handleCloseModal();
      }}
    >
      <div
        className="bg-white relative w-8/12 h-5/6 p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="btn absolute top-4 right-4"
          onClick={() => {
            handleCloseModal();
          }}
        >
          X
        </button>
        <h1>{'ADD PERSON'}</h1>
        <span
          className={`p-1 ${inputMethod && 'underline'}`}
          onClick={() => {
            setInputMethod(true);
            setPersonInfo({});
            setErrorMessage('');
          }}
        >
          Fill
        </span>
        <span
          className={`p-1 ${!inputMethod && 'underline'}`}
          onClick={() => {
            setInputMethod(false);
            setPersonInfo({});
            setErrorMessage('');
          }}
        >
          Manual
        </span>
        <div className="flex my-2">
          <label htmlFor={'id'} className="w-1/3">
            {language ? translate['id'][0] : translate['id'][1]}
          </label>
          <div className="border w-2/3 flex">
            <input
              className="input w-full"
              placeholder={translate['id'][0]}
              type="text"
              readOnly={false}
              value={personInfo.id || ''}
              onChange={(e) =>
                setPersonInfo({ ...personInfo, id: e.target.value })
              }
            />

            {inputMethod ? (
              <button className="btn" onClick={handlePersonLookup}>
                LOOKUP
              </button>
            ) : null}
          </div>
        </div>

        {errorMessage.length > 0 ? (
          <ErrorMessage message={errorMessage} />
        ) : null}

        {labels.map((label) => {
          return (
            <FormElement
              key={label}
              label={label}
              formInfo={personInfo}
              readOnly={inputMethod}
              setFormInfo={setPersonInfo}
            />
          );
        })}

        <button className="btn" onClick={handleFormSubmit}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddPersonModal;
