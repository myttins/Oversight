import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useMessageBanner } from '../../contexts/MessageBannerContext';
import ButtonWithIcon from '../../util/buttons/ButtonWithIcon';
import EditIcon from '../../assets/icons/edit.svg';
import Image from '../../util/Image';
import FormElement from '../../util/FormElement';

export const AvatarManager = ({ path, setPath, onFileSelected, active }) => {
  const fileInputRef = useRef(null);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onFileSelected(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setPath(reader.result);
        e.target.value = ''; // Clear the file input after selection
      };
      reader.readAsDataURL(file);
    }
  };

  const onImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='container mx-auto'>
      <input type='file' accept='image/*' onChange={onFileChange} ref={fileInputRef} className='hidden' />
      {active ? (
        <div
          className='w-40 h-40 bg-gray-500 rounded-full overflow-hidden flex items-center justify-center cursor-pointer opacity-50'
          onClick={onImageClick}
        >
          <Image src={path} />
          <span className='text-white text-center px-4 absolute'>Click to upload</span>
        </div>
      ) : (
        <div className='w-40 h-40 bg-gray-500 rounded-full overflow-hidden flex items-center justify-center'>
          <Image src={path} />
        </div>
      )}
    </div>
  );
};

export const PersonInfo = ({ personInfo, setPersonInfo, edit, avatarPath, setAvatarPath, setUploadedImage }) => {
  return (
    <div>
      <header className='m-2 relative flex'>
        <div className=''>
          <AvatarManager
            path={avatarPath}
            setPath={setAvatarPath}
            onFileSelected={(file) => setUploadedImage(file)}
            active={edit}
          />
        </div>
        <div className='mx-6'>
          <span className='text-color-light1 m-2'>ID NO: {personInfo.id_no}</span>
          {edit ? (
            <div className='flex flex-col'>
              <input
                className='input text-2xl m-2'
                type='text'
                value={personInfo.name}
                onChange={(e) => setPersonInfo({ ...personInfo, name: e.target.value.toUpperCase() })}
              />
              <input
                className='input m-2'
                type='text'
                value={personInfo.phone_no}
                onChange={(e) => setPersonInfo({ ...personInfo, phone_no: e.target.value.toUpperCase() })}
              />
            </div>
          ) : (
            <div>
              <h1 className='m-2'>{personInfo.name}</h1>
              <span className='m-2'>{personInfo.phone_no}</span>
            </div>
          )}
        </div>
      </header>

      <FormElement
        label={'driv_lic_no'}
        type='text'
        readOnly={!edit}
        formInfo={personInfo}
        setFormInfo={setPersonInfo}
      />
      <FormElement
        label={'current_address'}
        type='text'
        readOnly={!edit}
        formInfo={personInfo}
        setFormInfo={setPersonInfo}
      />
      <FormElement
        label={'business_lic_no'}
        type='text'
        readOnly={!edit}
        formInfo={personInfo}
        setFormInfo={setPersonInfo}
      />
      <FormElement
        label={'service_card_no'}
        type='text'
        readOnly={!edit}
        formInfo={personInfo}
        setFormInfo={setPersonInfo}
      />
    </div>
  );
};

const Person = () => {
  const { id } = useParams();
  const { showBanner } = useMessageBanner();

  const [personInfo, setPersonInfo] = useState({});
  const [originalPersonInfo, setOriginalPersonInfo] = useState({});
  const [avatarPath, setAvatarPath] = useState(''); // Separate state for avatar path
  const [uploadedImage, setUploadedImage] = useState(null);

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const response = await axios.get(`/api/people?id=${id}`);
        if (response.data.length === 1) {
          setPersonInfo(response.data[0]);
          setOriginalPersonInfo(response.data[0]);
          setAvatarPath(response.data[0].photo);
        } else {
          throw new Error();
        }
        setLoading(false);
      } catch (error) {
        showBanner({ style: 'error', message: 'Page not found' });
      }
    };

    fetchDataAndSetState();
  }, []);

  const handleCancelEdit = () => {
    setEdit(false);
    setPersonInfo({ ...originalPersonInfo }); // Reset personInfo to original
    setAvatarPath(originalPersonInfo.photo); // Reset avatar path on cancel
  };

  const handleUpdatePerson = async () => {
    const formData = new FormData();
    for (const key in personInfo) {
      formData.append(key, personInfo[key]);
    }

    if (uploadedImage) {
      formData.append('image', uploadedImage); // Add the uploaded image to formData
    }

    try {
      const response = await axios.patch(`/api/people/${id}`, formData);
      showBanner({ style: 'success', message: 'Update successful' });
      setPersonInfo(response.data.people[0]);
      setOriginalPersonInfo(response.data.people[0]);
      setAvatarPath(response.data.people[0].photo);
      setEdit(false);
    } catch (error) {
      showBanner({ style: 'error', message: 'Edit failed' });
    }
  };

  if (loading) return null;

  return (
    <div className='box-white'>
      <div className='relative'>
        <div className='absolute right-0 top-0 z-10'>
          {edit ? (
            <div>
              <button className='btn-lte mx-2' onClick={handleCancelEdit}>
                CANCEL
              </button>
              <button className='btn' onClick={handleUpdatePerson}>
                SAVE
              </button>
            </div>
          ) : (
            <ButtonWithIcon
              icon={EditIcon}
              onClick={() => {
                console.log(1);
                setEdit(true);
              }}
              alt={'edit'}
            />
          )}
        </div>
        <PersonInfo
          personInfo={personInfo}
          setPersonInfo={setPersonInfo}
          edit={edit}
          avatarPath={avatarPath}
          setAvatarPath={setAvatarPath}
          setUploadedImage={setUploadedImage}
        />
      </div>
    </div>
  );
};

export default Person;
