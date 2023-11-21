import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ButtonWithIcon from '../../../util/ButtonWithIcon.jsx';
import DeleteUserIcon from '../../../assets/icons/user-xmark.svg';
import { VehicleContext } from '../VehicleContainer.jsx';
import ConfirmationPopUp from '../../../util/ConfirmationModal.jsx';

const PersonCard = ({ person, handleDelete }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  return (
    <div className="border flex outline-2 m-2 p-1 mx-4 ">
      <div className="mx-2 w-[80px] aspect-w-1 aspect-h-1 p-1 flex items-center justify-center">
        <img src="/api/static/profiles/1/pp/1.jpg" />
      </div>
      <div className="w-full mx-2 p-1 flex flex-col">
        <Link to={'/'} className=" hover:underline">
          <h2>{person.name}</h2>
        </Link>
        <div className="flex ">
          <span className="w-1/3">ID: {person.id}</span>{' '}
          <span className="w-2/3">PHONE: {person.phone_number}</span>
        </div>
      </div>
      <div className="mx-2 w-10 flex items-center justify-center">
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
