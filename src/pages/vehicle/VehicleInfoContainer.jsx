import React, { useState } from 'react';
import { useOutletContext } from 'react-router';

import axios from 'axios';

import FormElement from './util/FormElement';
import translate from '../../assets/translate';
import Error from '../../error/Error';

const VehicleInfoContainer = (props) => {
  const { language } = useOutletContext();
  const { vehicleInfo, setVehicleInfo } = props;

  const [readOnly, setReadOnly] = useState(true);
  const fields = [
    'plate',
    'category',
    'vehicle_model',
    'engine_no',
    'vehicle_color',
    'vin',
    'fuel_type',
    'registration_date',
  ];

  const handleVehicleInfoSave = async () => {
    try {
      const response = await axios.post(
        `/api/vehicle/${vehicleInfo.id}`,
        vehicleInfo,
      );
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
          <button className="btn" onClick={() => setReadOnly(!readOnly)}>
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
        {fields.map((item) => {
          return (
            <FormElement
              key={item}
              label={item}
              type={'text'}
              readOnly={item === 'plate' ? true : readOnly}
              formInfo={vehicleInfo}
              setFormInfo={setVehicleInfo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VehicleInfoContainer;
