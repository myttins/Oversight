import React, { useContext, useState } from 'react';
import FormElement from '../FormElement';
import translate from '../../../../assets/translate';
import { useOutletContext } from 'react-router';
import ErrorMessage from '../../../../util/ErrorMessage';
import axios from 'axios';
import { VehicleContext } from '../../VehicleContainer';

const AddInsurerModal = (props) => {
  const { closeModal, updateContainerState } = props;
  const { language } = useOutletContext();

  const [vehicleInfo, setVehicleInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const vehicleId = useContext(VehicleContext);

  const labels = [
    'category',
    'vehicle_model',
    'vehicle_color',
    'vin',
    'engine_no',
  ];

  const handleVehicleLookup = async () => {
    if (!vehicleInfo.plate) {
      setErrorMessage('Invalid Input');
      return;
    }

    try {
      const response = await axios.get(
        `/api/vehicle/plate/${vehicleInfo.plate}`,
      );
      setVehicleInfo(response.data);
    } catch (error) {
      setErrorMessage('No vehicle found.');
      console.error(error);
    }
  };

  const handleAddInsurer = async () => {
    if (!vehicleInfo.id) {
      setErrorMessage('Invalid Input');
      return;
    }

    try {
      const response = await axios.post(
        `/api/vehicle/insurer?vehicleid=${vehicleId}&insurerid=${vehicleInfo.id}`,
      );
      updateContainerState('add', vehicleInfo);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-white relative w-8/12 h-5/6 p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="btn absolute top-4 right-4" onClick={closeModal}>
          X
        </button>
        <h1>{'ADD INSURER'}</h1>

        <div className="flex my-2">
          <label htmlFor={'plate'} className="w-1/3">
            {language ? translate['plate'][0] : translate['plate'][1]}
          </label>
          <div className="border w-2/3 flex">
            <input
              className="input w-full"
              placeholder={translate['plate'][0]}
              type="text"
              readOnly={false}
              value={vehicleInfo.plate || ''}
              onChange={(e) =>
                setVehicleInfo({ ...vehicleInfo, plate: e.target.value })
              }
            />

            <button className="btn" onClick={handleVehicleLookup}>
              LOOKUP
            </button>
          </div>
        </div>

        {errorMessage.length > 0 ? (
          <ErrorMessage message={errorMessage} />
        ) : null}

        {labels.map((label) => (
          <FormElement
            key={label}
            label={label}
            readOnly={label !== 'plate'}
            formInfo={vehicleInfo}
            setFormInfo={setVehicleInfo}
          />
        ))}

        <div className="absolute bottom-4 right-4 border">
          <button className="btn" onClick={handleAddInsurer}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInsurerModal;
