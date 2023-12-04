import React, { useState } from 'react';
import FormElement from '../../util/FormElement';
import { useMessageBanner } from '../../contexts/MessageBannerContext';

import axios from 'axios';
import { useNavigate } from 'react-router';

const NewVehicle = () => {
  const navigate = useNavigate();
  const { showBanner } = useMessageBanner();
  const [vehicleInfo, setVehicleInfo] = useState({});

  const handleAddNewVehicle = async (e) => {
    e.preventDefault();
    // validate input
    if (
      !vehicleInfo.plate ||
      !vehicleInfo.vehicle_model ||
      !vehicleInfo.category ||
      !vehicleInfo.vehicle_model ||
      !vehicleInfo.engine_no ||
      !vehicleInfo.vehicle_color ||
      !vehicleInfo.vin ||
      !vehicleInfo.operating_license_no ||
      !vehicleInfo.fuel_type
    ) {
      showBanner({ style: 'error', message: 'Invalid input' });
      return;
    }

    try {
      const response = await axios.post('/api/vehicle/new', vehicleInfo);
      const id = response.data.id;
      showBanner({ style: 'success', message: 'Vehicle added' });
      navigate(`/vehicle/${id}`);
    } catch (error) {
      console.error(error);
      showBanner({ style: 'error', message: axios.isAxiosError(error) ? error.response.data.message : '' });
    }
  };
  return (
    <div className='bg-white p-4'>
      <form onSubmit={handleAddNewVehicle}>
        <FormElement
          label={'plate'}
          type={'text'}
          readOnly={false}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'category'}
          type={'text'}
          readOnly={false}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'vehicle_model'}
          type={'text'}
          readOnly={false}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'engine_no'}
          type={'text'}
          readOnly={false}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'vehicle_color'}
          type={'text'}
          readOnly={false}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement label={'vin'} type={'text'} readOnly={false} formInfo={vehicleInfo} setFormInfo={setVehicleInfo} />
        <FormElement
          label={'operating_license_no'}
          type={'text'}
          readOnly={false}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'fuel_type'}
          type={'dropdown'}
          options={[
            { label: 'GAS', value: 'GAS' },
            { label: 'ELECTRIC', value: 'ELECTRIC' },
          ]}
          readOnly={false}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'registration_date'}
          type={'date'}
          readOnly={false}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'activation_date'}
          type={'date'}
          readOnly={false}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'notes'}
          type={'textarea'}
          readOnly={false}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <button className={'btn'} type='submit'>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default NewVehicle;
