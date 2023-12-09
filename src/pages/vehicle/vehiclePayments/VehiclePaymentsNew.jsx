import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import FormElement from '../../../util/FormElement';
import { useMessageBanner } from '../../../contexts/MessageBannerContext';

import axios from 'axios';

const VehiclePaymentsNew = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({});
  const { showBanner } = useMessageBanner();
  //     const { label, type, options, readOnly, formInfo, setFormInfo } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) {
      return;
    }
    try {
      await axios.post(`/api/payments/${id}`, form);
      navigate(`/vehicle/${id}/payments`);
    } catch (error) {
      console.error(error);
      showBanner({ style: 'error' });
    }
  };

  return (
    <div className='box-white'>
      <form onSubmit={handleSubmit}>
        <FormElement label={'description'} type='text' readOnly={false} formInfo={form} setFormInfo={setForm} />
        <FormElement label={'amount'} type={'decimal'} readOnly={false} formInfo={form} setFormInfo={setForm} />
        <button className={'btn'} type='submit'>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default VehiclePaymentsNew;
