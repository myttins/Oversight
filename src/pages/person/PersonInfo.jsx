import React, { useEffect, useState } from 'react';
import { useAxios } from '../../hooks/useAxios';
import { useParams } from 'react-router';
import EditIcon from '../../assets/icons/edit.svg';
import FormElement from '../../util/FormElement';
import ButtonWithIcon from '../../util/buttons/ButtonWithIcon';
import { useMessageBanner } from '../../contexts/MessageBannerContext';

const PersonInfo = () => {
  const { id } = useParams();
  const { fetchData, loading } = useAxios();
  const { showBanner } = useMessageBanner();

  const [personInfo, setPersonInfo] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const data = await fetchData(`/api/people/${id}?type=main`, { method: 'get' }, true);
      if (data) {
        setPersonInfo(data.person);
      }
    };
    fetchDataAndSetState();
  }, []);

  const handleUpdatePerson = async () => {
    const response = await fetchData(`/api/people/${id}`, { method: 'patch', data: personInfo }, false);

    if (response) {
      showBanner({ style: 'success' });
      setEdit(false);
    }
  };

  if (loading) return null;

  return (
    <div className='box-white'>
      <header className='relative'>
        <h2>PERSON INFO</h2>
        <div className='absolute right-0 top-0'>
          {edit ? (
            <div>
              <button className='btn-lte mx-2' onClick={() => setEdit(false)}>
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
