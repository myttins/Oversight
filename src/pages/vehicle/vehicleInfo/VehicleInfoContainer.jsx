import React, { useContext, useState } from 'react';

import axios from 'axios';

import FormElement from '../../../util/FormElement.jsx';
import translate from '../../../assets/translate.js';
import ErrorMessage from '../../../util/error/ErrorMessage.jsx';
import ButtonWithIcon from '../../../util/buttons/ButtonWithIcon.jsx';
import EditIcon from '../../../assets/icons/edit.svg';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import { MessageBannerContext } from '../../../contexts/MessageBannerContext.jsx';

const VehicleInfoContainer = ({ vehicleInfo, setVehicleInfo }) => {
  const { language } = useLanguage();

  const [readOnly, setReadOnly] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { showBanner } = useContext(MessageBannerContext);

  const handleVehicleInfoSave = async () => {
    try {
      await axios.post(`/api/vehicle/${vehicleInfo.id}`, vehicleInfo);
    } catch (error) {
      console.error('Error making POST request:', error);
      showBanner({ style: 'error' });
    }
    setReadOnly(true);
  };

  const inputIsValid = () => {
    if (
      !vehicleInfo.plate ||
      !vehicleInfo.vehicle_model ||
      !vehicleInfo.category ||
      !vehicleInfo.vehicle_model ||
      !vehicleInfo.engine_no ||
      !vehicleInfo.vehicle_color ||
      !vehicleInfo.vin ||
      !vehicleInfo.notes ||
      !vehicleInfo.operating_license_no ||
      !vehicleInfo.fuel_type
    ) {
      setErrorMessage('Invalid Input');
      return false;
    }

    return true;
  };

  return (
    <div className='p-4 bg-white my-4'>
      <div className='flex justify-between'>
        <h2>{language ? translate.vehicle_info[0] : translate.vehicle_info[1]}</h2>
        {readOnly ? (
          <ButtonWithIcon
            icon={EditIcon}
            onClick={() => {
              setReadOnly(!readOnly);
            }}
            alt={'edit'}
          />
        ) : (
          <div>
            <button className='btn mx-2' onClick={() => setReadOnly(!readOnly)}>
              CANCEL
            </button>

            <button className='btn mx-2' onClick={handleVehicleInfoSave}>
              SAVE
            </button>
          </div>
        )}
      </div>
      <div className='px-4'>
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
          label={'operating_license_no'}
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
        {/* <FormElement
          label={'activation_date'}
          type={'date'}
          readOnly={readOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        /> */}
        <FormElement
          label={'notes'}
          type={'textarea'}
          readOnly={readOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
      </div>
      {errorMessage.length > 0 ? <ErrorMessage message={errorMessage} /> : null}
    </div>
  );
};

export default VehicleInfoContainer;
