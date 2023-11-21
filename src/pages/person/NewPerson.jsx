import React, { useState } from 'react';
import FormElement from '../vehicle/util/FormElement.jsx';
import axios from 'axios';
import ErrorMessage from '../../error/ErrorMessage.jsx';
import { useNavigate, useSearchParams } from 'react-router-dom';

const NewPerson = () => {
  const [idSearched, setIdSearched] = useState(false);
  const [personFound, setPersonFound] = useState(false);
  const [person, setPerson] = useState({});
  const [message, setMessage] = useState('');

  const [urlParams, setUrlParams] = useSearchParams();

  const navigate = useNavigate()

  const redirect = urlParams.get('redirect');
  const vehicleId = urlParams.get('path');
  const driverOrOwner = urlParams.get('person');

  const handleIdSearch = async (e) => {
    e.preventDefault();

    if (!person.id_no) {
      setMessage('Invalid Input.');
      return;
    }

    try {
      const response = await axios.get(`/api/people/${person.id_no}`);
      if (response.data.length === 0) {
        setMessage('No person found. Manual entry');
        setPersonFound(false);
        setIdSearched(true);
        return;
      } else {
        setMessage('Person found');
        setPersonFound(true);
        setIdSearched(true);
        setPerson(response.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setIdSearched(false);
    setPersonFound(false);
    setMessage('');
    setPerson({});
  };

  const handleSubmit = async () => {
    // TODO add data validation
    if (
      !person.id_no ||
      !person.name ||
      !person.current_address ||
      !person.phone_no ||
      !person.driv_lic_no ||
      !person.business_lic_no ||
      !person.service_card_no
    ) {
      setMessage('Invalid input');
      return;
    }
    try {
      if (redirect === 'true') {
        await axios.post(
          `/api/people?input=${personFound}&type=${driverOrOwner}&vehicleid=${vehicleId}`,
          person,
        );

        navigate(`/vehicle/${vehicleId}`)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border p-4 bg-white h-screen">
      <h2>ADD NEW PERSON</h2>
      <div>
        <form>
          <label>ID: </label>
          <input
            className="input"
            readOnly={idSearched}
            value={person.id_no || ''}
            onChange={(e) => setPerson({ ...person, id_no: e.target.value })}
          ></input>
          <button type="submit" className="btn" onClick={handleIdSearch}>
            ENTER
          </button>
        </form>
      </div>
      {message.length > 0 && <ErrorMessage message={message} />}

      {idSearched && (
        <div>
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
        </div>
      )}
      <button className="btn" onClick={clearForm}>
        CLEAR
      </button>
      <button className="btn" onClick={handleSubmit}>
        SAVE
      </button>
    </div>
  );
};

export default NewPerson;
