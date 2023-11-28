import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import { useSearchParams } from 'react-router-dom';
import FormElement from '../../../util/FormElement.jsx';

import axios from 'axios';
import { MessageBannerContext } from '../../../contexts/MessageBannerContext.jsx';

const AddInsurer = () => {
  const { showBanner, hideBanner } = useContext(MessageBannerContext);
  const navigate = useNavigate();
  const [urlParams, setUrlParams] = useSearchParams();
  const redirect = urlParams.get('redirect');
  const vehicleId = urlParams.get('path');

  const [vehicle, setVehicle] = useState({
    id: '',
    plate: '',
    category: 0,
    vehicle_model: '',
    vehicle_color: '',
    vin: '',
    fuel_type: 'GAS',
    engine_no: '',
    activation_date: '',
    registration_date: '',
    operating_license_no: '',
    notes: '',
  });
  const [searched, setSearched] = useState < boolean > false;

  const handleSubmit = async () => {
    try {
      await axios.post(
        `/api/vehicle/insurer?vehicleid=${vehicleId}&insurerid=${vehicle.id}`,
      );
      navigate(`/vehicle/${vehicleId}`);
    } catch (error) {
      console.error(error);
      showBanner({ style: 'error', message: 'Failed to add insurer.' });
    }
  };

  const handleVehicleLookup = async () => {
    if (vehicle.plate === '') {
      showBanner({ style: 'error' });
      return;
    }

    try {
      const response = await axios.get(`/api/vehicle/plate/${vehicle.plate}`);
      if (response.data.length === 0) {
        showBanner({ style: 'error', message: 'Vehicle not found.' });
      } else {
        setVehicle(response.data[0]);
        setSearched(true);
      }
    } catch (error) {
      console.error(error);
      showBanner({ style: 'error' });
    }
  };

  const clearInputs = () => {
    setVehicle({
      id: '',
      plate: '',
      category: 0,
      vehicle_model: '',
      vehicle_color: '',
      vin: '',
      fuel_type: 'GAS',
      engine_no: '',
      activation_date: '',
      registration_date: '',
      operating_license_no: '',
      notes: '',
    });
    setSearched(false);
  };

  return (
    <div className="rounded-md p-4 bg-white">
      <header>
        <h2>ADD INSURER TO VEHICLE {vehicleId}</h2>
      </header>
      {!searched ? (
        <div className="flex">
          <label className="w-1/3">PLATE</label>
          <input
            className="input w-1/3"
            placeholder="PLATE"
            onChange={(e) => setVehicle({ ...vehicle, plate: e.target.value })}
          />
          <button className="btn mx-4" onClick={handleVehicleLookup}>
            SEARCH
          </button>
        </div>
      ) : (
        <div className="px-4">
          <FormElement
            label={'plate'}
            type={'text'}
            readOnly={true}
            formInfo={vehicle}
            setFormInfo={setVehicle}
          />
          <FormElement
            label={'category'}
            type={'text'}
            readOnly={true}
            formInfo={vehicle}
            setFormInfo={setVehicle}
          />
          <FormElement
            label={'vehicle_model'}
            type={'text'}
            readOnly={true}
            formInfo={vehicle}
            setFormInfo={setVehicle}
          />
          <FormElement
            label={'engine_no'}
            type={'text'}
            readOnly={true}
            formInfo={vehicle}
            setFormInfo={setVehicle}
          />
          <FormElement
            label={'vehicle_color'}
            type={'text'}
            readOnly={true}
            formInfo={vehicle}
            setFormInfo={setVehicle}
          />
          <FormElement
            label={'vin'}
            type={'text'}
            readOnly={true}
            formInfo={vehicle}
            setFormInfo={setVehicle}
          />
          <FormElement
            label={'operating_license_no'}
            type={'text'}
            readOnly={true}
            formInfo={vehicle}
            setFormInfo={setVehicle}
          />
          <FormElement
            label={'fuel_type'}
            type={'dropdown'}
            options={[
              { label: 'GAS', value: 'GAS' },
              { label: 'ELECTRIC', value: 'ELECTRIC' },
            ]}
            readOnly={true}
            formInfo={vehicle}
            setFormInfo={setVehicle}
          />
          <FormElement
            label={'registration_date'}
            type={'date'}
            readOnly={true}
            formInfo={vehicle}
            setFormInfo={setVehicle}
          />
          <FormElement
            label={'activation_date'}
            type={'date'}
            readOnly={true}
            formInfo={vehicle}
            setFormInfo={setVehicle}
          />
          <FormElement
            label={'notes'}
            type={'textarea'}
            readOnly={true}
            formInfo={vehicle}
            setFormInfo={setVehicle}
          />
          <div>
            <button className="btn" onClick={clearInputs}>
              CLEAR
            </button>
            <button className="btn mx-2" onClick={handleSubmit}>
              SAVE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddInsurer;
