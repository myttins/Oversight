import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ConfirmationPopUp from '../../../util/ConfirmationModal.jsx';
import DeleteUserIcon from '../../../assets/icons/user-xmark.svg';

import axios from 'axios';
import ButtonWithIcon from '../../../util/buttons/ButtonWithIcon.jsx';
import AddIcon from '../../../assets/icons/plus-square-solid.svg';

const InsurerContainer = ({ insurer, setInsurer }) => {
  const navigate = useNavigate();
  const vehicleId = useParams();

  const handleAddInsurer = () => {
    navigate(`/vehicle/new-insurer?redirect=true&to=vehicle&path=${vehicleId}`);
  };

  const updateContainerState = (type, insurer) => {
    if (type === 'delete') {
      setInsurer([]);
    } else if (type === 'add') {
      setInsurer([insurer]);
    }
  };

  return (
    <div className="rounded-md p-4 my-4 bg-white">
      <div className="flex justify-between">
        <h2>{'INSURER INFO'}</h2>
        {insurer.length === 0 && (
          <ButtonWithIcon
            icon={AddIcon}
            onClick={handleAddInsurer}
            alt={'Add Insurer'}
          />
        )}
      </div>

      {insurer.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          updateContainerState={updateContainerState}
        />
      ))}
    </div>
  );
};

const VehicleCard = ({ vehicle, updateContainerState }) => {
  const navigate = useNavigate();

  const vehicleId = useParams();

  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  const handleCloseConfirmationModal = () => {
    setConfirmationModalVisible(false);
  };

  const handleDeleteButtonClick = async () => {
    try {
      await axios.delete(
        `/api/vehicle/insurer/?insurerid=${vehicle.id}&vehicleid=${vehicleId}`,
      );
      updateContainerState('delete', {});
      setConfirmationModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border p-4 m-2 flex justify-between">
      <div>
        <h2 className={'cursor-pointer hover:underline'} onClick={() => navigate(`/vehicle/${vehicle.id}`)}>{vehicle.plate}</h2>
      </div>
      <ButtonWithIcon
        alt={'delete'}
        icon={DeleteUserIcon}
        onClick={(e) => {
          e.stopPropagation();
          setConfirmationModalVisible(true);
        }}
      />

      <ConfirmationPopUp
        isOpen={confirmationModalVisible}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleDeleteButtonClick}
        message={'Confirm Delete'}
      />
    </div>
  );
};

export default InsurerContainer;
