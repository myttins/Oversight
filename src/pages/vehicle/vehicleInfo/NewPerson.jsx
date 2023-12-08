import React, { useContext, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { MessageBannerContext } from '../../../contexts/MessageBannerContext.jsx';
import axios from 'axios';
import { PersonInfo } from '../../person/Person.jsx';

const NewPerson = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [idSearched, setIdSearched] = useState(false);
  const [personFound, setPersonFound] = useState(false);
  const [personIdNo, setPersonIdNo] = useState('');

  const [personInfo, setPersonInfo] = useState({});
  const [avatarPath, setAvatarPath] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  const { showBanner } = useContext(MessageBannerContext);

  const [urlParams, setUrlParams] = useSearchParams();
  const driverOrOwner = urlParams.get('type');

  const handleIdSearch = async (e) => {
    // TODO: Add loading animation while search is being handled
    e.preventDefault();

    if (!personIdNo) {
      showBanner({ style: 'error', message: 'Invalid input.' });
      return;
    }

    try {
      const response = await axios.get(`/api/people?id_no=${personIdNo}`);
      if (response.data.length === 0) {
        showBanner({ style: 'neutral', message: 'No person found. Input info' });
        setPersonFound(false);
        setIdSearched(true);
        setPersonInfo({ id_no: personIdNo });
      } else {
        showBanner({ style: 'neutral', message: 'Person found.' });
        setPersonFound(true);
        setIdSearched(true);
        setPersonInfo(response.data[0]);
        setAvatarPath(response.data[0].photo);
      }
    } catch (error) {
      showBanner({ style: 'error', message: error.response.data.message });
      console.error(error);
    }
  };

  const clearForm = () => {
    setIdSearched(false);
    setPersonFound(false);
    setPersonInfo({});
  };

  const handleSubmit = async () => {
    if (
      !personInfo.id_no ||
      !personInfo.name ||
      !personInfo.current_address ||
      !personInfo.phone_no ||
      !personInfo.driv_lic_no ||
      !personInfo.business_lic_no ||
      !personInfo.service_card_no
    ) {
      showBanner({ style: 'error', message: 'Invalid input' });
      return;
    }

    try {
      await axios.post(`/api/people?input=${personFound}&type=${driverOrOwner}&vehicleid=${id}`, personInfo);
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
        <form className='flex'>
          <label className='w-1/3'>ID NO.</label>
          <input
            className='input w-1/3'
            placeholder='ID NO.'
            onChange={(e) => setPersonIdNo(e.target.value)}
            value={personIdNo || ''}
          />
          <button className='btn mx-4' type='submit' onClick={handleIdSearch}>
            SEARCH
          </button>
        </form>
      ) : (
        <>
          {personFound ? (
            <PersonInfo
              personInfo={personInfo}
              setPersonInfo={setPersonInfo}
              avatarPath={avatarPath}
              setAvatarPath={setAvatarPath}
              edit={false}
              setUploadedImage={setUploadedImage}
            />
          ) : (
            <PersonInfo
              personInfo={personInfo}
              setPersonInfo={setPersonInfo}
              avatarPath={avatarPath}
              setAvatarPath={setAvatarPath}
              edit={true}
              setUploadedImage={setUploadedImage}
            />
          )}

          <div className='flex justify-end'>
            <button className='btn-lte' onClick={clearForm}>
              CLEAR
            </button>
            <button className='btn mx-2' onClick={handleSubmit}>
              SAVE
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPerson;
