import React, { useContext, useState } from 'react';
import FormElement from '../../util/FormElement.jsx';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MessageBannerContext } from '../../contexts/MessageBannerContext.jsx';

const NewPerson = () => {
  const [idSearched, setIdSearched] = useState(false);
  const [personFound, setPersonFound] = useState(false);
  const [person, setPerson] = useState({});

  const [urlParams, setUrlParams] = useSearchParams();

  const navigate = useNavigate();
  const { showBanner, hideBanner } = useContext(MessageBannerContext);

  const redirect = urlParams.get('redirect');
  const vehicleId = urlParams.get('path');
  const driverOrOwner = urlParams.get('person');

  const handleIdSearch = async (e) => {
    e.preventDefault();

    if (!person.id_no) {
      showBanner({ style: 'error', message: 'Invalid input.' });
      return;
    }

    try {
      showBanner({ style: 'loading' });
      const response = await axios.get(`/api/people/${person.id_no}`);
      hideBanner();
      if (response.data.length === 0) {
        showBanner({
          style: 'neutral',
          message: 'No person found. Input info',
        });
        setPersonFound(false);
        setIdSearched(true);
        return;
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
      return;
    }
    try {
      if (redirect === 'true') {
        await axios.post(
          `/api/people?input=${personFound}&type=${driverOrOwner}&vehicleid=${vehicleId}`,
          person,
        );
        navigate(`/vehicle/${vehicleId}`);
      }
    } catch (error) {
      showBanner({ style: 'error', message: error.response.data.message });
      console.error(error);
    }
  };

  return (
    <div className=" p-4 bg-white">
      <h2>ADD NEW PERSON</h2>
      {!idSearched ? (
        <>
          <form className="flex">
            <label className="w-1/3">ID NO.</label>
            <input
              className="input w-1/3"
              placeholder="ID NO."
              onChange={(e) => setPerson({ ...person, id_no: e.target.value })}
              value={person.id_no || ''}
            />
            <button
              className="btn mx-4"
              type={'submit'}
              onClick={handleIdSearch}
            >
              SEARCH
            </button>
          </form>
        </>
      ) : (
        <div>
          <FormElement
            label={'id'}
            type={'text'}
            readOnly={personFound}
            formInfo={person}
            setFormInfo={setPerson}
          />
          <FormElement
            label={'name'}
            type={'text'}
            readOnly={personFound}
            formInfo={person}
            setFormInfo={setPerson}
          />
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
          <div>
            <button className="btn" onClick={clearForm}>
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

export default NewPerson;
