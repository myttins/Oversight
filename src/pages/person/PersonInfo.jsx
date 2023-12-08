import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import EditIcon from '../../assets/icons/edit.svg';
import FormElement from '../../util/FormElement';
import ButtonWithIcon from '../../util/buttons/ButtonWithIcon';
import { useMessageBanner } from '../../contexts/MessageBannerContext';
import axios from 'axios';

const PersonInfo = () => {
  const { id } = useParams();
  const { showBanner } = useMessageBanner();

  const [personInfo, setPersonInfo] = useState({});
  const [originalPersonInfo, setOriginalPersonInfo] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const response = await axios.get(`/api/people?id=${id}&type=main`);
        if (response.data.length === 1) {
          setPersonInfo(response.data[0]);
          setOriginalPersonInfo(response.data[0]);
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

  const handleUpdatePerson = async () => {
    try {
      const response = await axios.patch(`/api/people/${id}`, personInfo);
      setPersonInfo(response.data.people[0]);
      setOriginalPersonInfo(response.data.people[0]);
      setEdit(false);
      showBanner({ style: 'success', message: 'Update successful' });
    } catch (error) {
      showBanner({ style: 'error', message: 'Update failed' });
    }
  };

  const handleCancelEdit = () => {
    setPersonInfo(originalPersonInfo); // Reset to original data
    setEdit(false);
  };

  if (loading) return null;

  return (
    <div className='box-white'>
      <header className='relative'>
        <h2>PERSON INFO</h2>
        <div className='absolute right-0 top-0'>
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
                setEdit(true);
              }}
              alt={'edit'}
            />
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

export default PersonInfo;
