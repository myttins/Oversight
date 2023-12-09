import React, { useContext, useState } from 'react';

import axios from 'axios';

import FormElement from '../../../util/FormElement.jsx';
import translate from '../../../assets/translate.js';
import ButtonWithIcon from '../../../util/buttons/ButtonWithIcon.jsx';
import EditIcon from '../../../assets/icons/edit.svg';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import { MessageBannerContext } from '../../../contexts/MessageBannerContext.jsx';

const VehicleInfoForm = ({ vehicleInfo, setVehicleInfo }) => {
  const { language } = useLanguage();

  const [readOnly, setReadOnly] = useState(true);

  const [vehicle, setVehicle] = useState(vehicleInfo);

  const { showBanner } = useContext(MessageBannerContext);

  const handleVehicleInfoSave = async () => {
    try {
      await axios.post(`/api/vehicle/${vehicle.id}`, vehicle);
      setReadOnly(true);
      showBanner({ style: 'success', message: 'Vehicle edited successfully' });
    } catch (error) {
      console.error(error);
      showBanner({ style: 'error' });
    }
  };

  const handleCancelVehicleEdit = () => {
    setReadOnly(true);
    setVehicle(vehicleInfo);
  };

  return (
    <div className=''>
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
            <button className='btn mx-2' onClick={handleCancelVehicleEdit}>
              CANCEL
            </button>

            <button className='btn mx-2' onClick={handleVehicleInfoSave}>
              SAVE
            </button>
          </div>
        )}
      </div>
      <div className='px-4'>
        <FormElement label={'category'} type={'text'} readOnly={readOnly} formInfo={vehicle} setFormInfo={setVehicle} />
        <FormElement
          label={'vehicle_model'}
          type={'text'}
          readOnly={readOnly}
          formInfo={vehicle}
          setFormInfo={setVehicle}
        />
        <FormElement
          label={'engine_no'}
          type={'text'}
          readOnly={readOnly}
          formInfo={vehicle}
          setFormInfo={setVehicle}
        />
        <FormElement
          label={'vehicle_color'}
          type={'text'}
          readOnly={readOnly}
          formInfo={vehicle}
          setFormInfo={setVehicle}
        />
        <FormElement label={'vin'} type={'text'} readOnly={readOnly} formInfo={vehicle} setFormInfo={setVehicle} />
        <FormElement
          label={'operating_license_no'}
          type={'text'}
          readOnly={readOnly}
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
          readOnly={readOnly}
          formInfo={vehicle}
          setFormInfo={setVehicle}
        />
        <FormElement
          label={'registration_date'}
          type={'date'}
          readOnly={readOnly}
          formInfo={vehicle}
          setFormInfo={setVehicle}
        />
        {/* <FormElement
          label={'activation_date'}
          type={'date'}
          readOnly={readOnly}
          formInfo={vehicle}
          setFormInfo={setVehicle}
        /> */}
        <FormElement
          label={'notes'}
          type={'textarea'}
          readOnly={readOnly}
          formInfo={vehicle}
          setFormInfo={setVehicle}
        />
      </div>
    </div>
  );
};

export default VehicleInfoForm;
