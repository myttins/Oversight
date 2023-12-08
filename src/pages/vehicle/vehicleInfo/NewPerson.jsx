import React, { useContext, useState } from 'react';
import FormElement from '../../../util/FormElement.jsx';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { MessageBannerContext } from '../../../contexts/MessageBannerContext.jsx';
import axios from 'axios';

const NewPerson = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [idSearched, setIdSearched] = useState(false);
  const [personFound, setPersonFound] = useState(false);
  const [person, setPerson] = useState({});

  const { showBanner } = useContext(MessageBannerContext);

  const [urlParams, setUrlParams] = useSearchParams();
  const driverOrOwner = urlParams.get('type');

  const handleIdSearch = async (e) => {
    // TODO: Add loading animation while search is being handled
    e.preventDefault();

    if (!person.id_no) {
      showBanner({ style: 'error', message: 'Invalid input.' });
      return;
    }

    try {
      const response = await axios.get(`/api/people?id_no=${person.id_no}`);
      if (response.data.length === 0) {
        showBanner({ style: 'neutral', message: 'No person found. Input info' });
        setPersonFound(false);
        setIdSearched(true);
      } else {
        showBanner({ style: 'neutral', message: 'Person found.' });
        setPersonFound(true);
        setIdSearched(true);
        setPerson(response.data[0]);
      }
    } catch (error) {
      showBanner({ style: 'error', message: error.response.data.message });
      console.error(error);
    }
  };

  const clearForm = () => {
    setIdSearched(false);
    setPersonFound(false);
    setPerson({});
  };

  const handleSubmit = async () => {
    if (
      !person.id_no ||
      !person.name ||
      !person.current_address ||
      !person.phone_no ||
      !person.driv_lic_no ||
      !person.business_lic_no ||
      !person.service_card_no
    ) {
      showBanner({ style: 'error', message: 'Invalid input' });
      return;
    }

    try {
      await axios.post(`/api/people?input=${personFound}&type=${driverOrOwner}&vehicleid=${id}`, person);
      showBanner({ style: 'success', message: 'Person added' });
      navigate(`/vehicle/${id}`);
    } catch (error) {
      showBanner({ style: 'error', message: axios.isAxiosError(error) ? error.response.data.message : 'Client error' });
      console.error(error);
    }
  };

  return (
    <div className='box-white'>
      <h2>ADD NEW PERSON</h2>
      {!idSearched ? (
        <>
          <form className='flex'>
            <label className='w-1/3'>ID NO.</label>
            <input
              className='input w-1/3'
              placeholder='ID NO.'
              onChange={(e) => setPerson({ ...person, id_no: e.target.value })}
              value={person.id_no || ''}
            />
            <button className='btn mx-4' type={'submit'} onClick={handleIdSearch}>
              SEARCH
            </button>
          </form>
        </>
      ) : (
        <div>
          <FormElement label={'id_no'} type={'text'} readOnly={personFound} formInfo={person} setFormInfo={setPerson} />
          <FormElement label={'name'} type={'text'} readOnly={personFound} formInfo={person} setFormInfo={setPerson} />
          <FormElement
            label={'phone_no'}
            type={'text'}
            readOnly={personFound}
            formInfo={person}
            setFormInfo={setPerson}
          />
          <FormElement
            label={'driv_lic_no'}
            type={'text'}
            readOnly={personFound}
            formInfo={person}
            setFormInfo={setPerson}
          />
          <FormElement
            label={'current_address'}
            type={'text'}
            readOnly={personFound}
            formInfo={person}
            setFormInfo={setPerson}
          />
          <FormElement
            label={'business_lic_no'}
            type={'text'}
            readOnly={personFound}
            formInfo={person}
            setFormInfo={setPerson}
          />
          <FormElement
            label={'service_card_no'}
            type={'text'}
            readOnly={personFound}
            formInfo={person}
            setFormInfo={setPerson}
          />
          <div className='flex justify-between'>
            <button className='btn-lte' onClick={() => navigate(-1)}>
              CANCEL
            </button>
            <div>
              <button className='btn-lte' onClick={clearForm}>
                CLEAR
              </button>
              <button className='btn mx-2' onClick={handleSubmit}>
                SAVE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPerson;