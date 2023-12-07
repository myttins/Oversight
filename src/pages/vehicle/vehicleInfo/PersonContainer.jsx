import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import axios from 'axios';

import translate from '../../../assets/translate.js';
import PersonCard from './PersonCard.jsx';
import ButtonWithIcon from '../../../util/buttons/ButtonWithIcon.jsx';
import AddIcon from '../../../assets/icons/plus-square-solid.svg';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import { useMessageBanner } from '../../../contexts/MessageBannerContext.jsx';

const PersonContainer = (props) => {
  const { language } = useLanguage();
  const { showBanner } = useMessageBanner();
  const { people, setPeople, driverOrOwner } = props;

  const { id } = useParams();

  const navigate = useNavigate();

  const handleDelete = async (person) => {
    try {
      await axios.delete(`/api/people?type=${driverOrOwner}&vehicleid=${id}&personid=${person.id}`);
      setPeople((prevPeople) => prevPeople.filter((prev) => prev.id !== person.id));
      showBanner({ style: 'success', message: 'Person deleted' });
    } catch (error) {
      console.error(error);
      showBanner({ style: 'error', message: axios.isAxiosError(error) ? error.response.data.message : error.message });
    }
  };

  const handleAdd = () => {
    navigate(`/vehicle/1/new-person?type=${driverOrOwner}`);
  };

  return (
    <div className='rounded-md my-4 p-4 bg-white'>
      <div className='flex justify-between'>
        {driverOrOwner === 'driver' ? (
          <h2>{language ? translate.driver_info[0] : translate.driver_info[1]}</h2>
        ) : (
          <h2>{language ? translate.owner_info[0] : translate.owner_info[1]}</h2>
        )}
        {(driverOrOwner === 'driver' || people.length === 0) && <ButtonWithIcon onClick={handleAdd} icon={AddIcon} />}
      </div>
      <div>
        {people.map((person, i) => {
          return <PersonCard key={i} person={person} driverOrOwner={driverOrOwner} handleDelete={handleDelete} />;
        })}
      </div>
    </div>
  );
};

export default PersonContainer;
