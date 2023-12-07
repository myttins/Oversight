import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonWithIcon from '../../../util/buttons/ButtonWithIcon.jsx';
import DeleteUserIcon from '../../../assets/icons/user-xmark.svg';
import ConfirmationPopUp from '../../../util/ConfirmationModal.jsx';
import Image from '../../../util/Image.jsx';

const PersonCard = ({ person, handleDelete }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  return (
    <div className='border flex outline-2 p-1 mx-4'>
      {/* <div className=' p-1 flex items-center justify-center rounded-full'>
        <img src={person.photo || '/public/profile/1/1.jpg'} className='w-full h-full object-cover' />
      </div> */}

      <div className='w-[60px] aspect-w-1 aspect-h-1 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center cursor-pointer'>
        <Image src={person.photo} />
      </div>
      <div className='w-full mx-2 p-1 flex flex-col'>
        <Link to={`/person/${person.id}`} className=' hover:underline'>
          <h2>{person.name}</h2>
        </Link>
        <div className='flex '>
          <span className='w-1/3'>ID: {person.id}</span> <span className='w-2/3'>PHONE: {person.phone_no}</span>
        </div>
      </div>
      <div className='mx-2 w-10 flex items-center justify-center'>
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
