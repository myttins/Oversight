import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonWithIcon from '../../../util/buttons/ButtonWithIcon.jsx';
import DeleteUserIcon from '../../../assets/icons/user-xmark.svg';
import ConfirmationPopUp from '../../../util/ConfirmationModal.jsx';
import Image from '../../../util/Image.jsx';

const PersonCard = ({ person, handleDelete }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  return (
    <div className='flex max-w-sm bg-slate-50 m-4 border relative rounded-md shadow-sm p-2'>
      <div className='border w-[72px] h-[72px] bg-gray-400 rounded-full overflow-hidden flex items-center justify-center'>
        <Image src={person.photo} />
      </div>
      <div className='mx-2 p-1 flex flex-col'>
        <Link to={`/person/${person.id}`} className=' hover:underline'>
          <h2>{person.name}</h2>
        </Link>
        <div className='flex flex-col text-color-light1'>
          <span className='text-sm'>ID: {person.id}</span>
          <span className='text-sm'>PHONE: {person.phone_no}</span>
        </div>
      </div>
      <div className='absolute top-4 right-4'>
        <ButtonWithIcon
          alt={'delete'}
          icon={DeleteUserIcon}
          onClick={(e) => {
            e.stopPropagation();
            setIsConfirmModalOpen(true);
          }}
        />
      </div>

      <ConfirmationPopUp
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          handleDelete(person);
          setIsConfirmModalOpen(false);
        }}
        message={'Confirm Delete'}
      />
    </div>
  );
};

export default PersonCard;
