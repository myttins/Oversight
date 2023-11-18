import React, { useState } from 'react';
import axios from 'axios';
import FormElement from '../FormElement';

const PersonModal = (props) => {
  const { handleCloseModal, newPerson, person, updateContainerState } = props;

  const [readOnly, setReadOnly] = useState(!newPerson);
  const [personInfo, setPersonInfo] = useState(structuredClone(person));

  const labels = [
    'id',
    'name',
    'current_address',
    'phone_number',
    'driver_license_number',
    'business_license_number',
    'service_card_number',
  ];

  const handlePersonEdit = async () => {
    // fetch request
    try {
      await axios.put(`/api/people/${personInfo.id}`, personInfo);
      updateContainerState('edit', personInfo);
      setReadOnly(true);
    } catch (error) {
      console.error(error);
    }
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
        <h1>{newPerson ? 'ADD PERSON' : 'PERSON INFO'}</h1>

        {labels.map((label) => {
          return (
            <FormElement
              key={label}
              label={label}
              formInfo={personInfo}
              readOnly={label === 'id' ? true : readOnly}
              setFormInfo={setPersonInfo}
            />
          );
        })}
        <div className="absolute bottom-4 right-4 border">
          {readOnly ? (
            <button className="btn" onClick={() => setReadOnly(false)}>
              Edit
            </button>
          ) : (
            <>
              <button className="btn" onClick={() => setReadOnly(true)}>
                Cancel
              </button>
              <button className="btn" onClick={handlePersonEdit}>
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonModal;
