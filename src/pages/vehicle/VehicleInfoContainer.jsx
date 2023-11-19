import React, { useState } from 'react';
import { useOutletContext } from 'react-router';

import axios from 'axios';

import FormElement from './util/FormElement';
import translate from '../../assets/translate';

const VehicleInfoContainer = ({ vehicleInfo, setVehicleInfo, newVehicle }) => {
  const { language } = useOutletContext();

  const [readOnly, setReadOnly] = useState(!newVehicle);

  const handleVehicleInfoSave = async () => {
    try {
      await axios.post(`/api/vehicle/${vehicleInfo.id}`, vehicleInfo);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
    setReadOnly(true);
  };

  return (
    <div className="border p-4 m-4 bg-white">
      <div className="flex justify-between">
        <h1>
          {language ? translate.vehicle_info[0] : translate.vehicle_info[1]}
        </h1>

        {readOnly ? (
          <button
            className="btn"
            onClick={() => {
              setReadOnly(!readOnly);
              console.log(vehicleInfo);
            }}
          >
            EDIT
          </button>
        ) : (
          <div>
            <button className="btn mx-2" onClick={() => setReadOnly(!readOnly)}>
              CANCEL
            </button>
            <button className="btn mx-2" onClick={handleVehicleInfoSave}>
              SAVE
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <FormElement
          label={'plate'}
          type={'text'}
          readOnly={!newVehicle}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'category'}
          type={'text'}
          readOnly={readOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'vehicle_model'}
          type={'text'}
          readOnly={readOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'engine_no'}
          type={'text'}
          readOnly={readOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'vehicle_color'}
          type={'text'}
          readOnly={readOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'vin'}
          type={'text'}
          readOnly={readOnly}
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
          readOnly={readOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'registration_date'}
          type={'date'}
          readOnly={readOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'activation_date'}
          type={'date'}
          readOnly={readOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
      </div>
    </div>
  );
};

export default VehicleInfoContainer;
