import React, { useContext, useState } from 'react';
import AddInsurerModal from './AddInsurerModal.jsx';
import { useNavigate } from 'react-router';
import ConfirmationPopUp from '../../../util/ConfirmationModal.jsx';
import { VehicleContext } from '../VehicleContainer.jsx';

import axios from 'axios';
import ButtonWithIcon from '../../../util/buttons/ButtonWithIcon.jsx';
import AddIcon from '../../../assets/icons/plus-square-solid.svg';

const InsurerContainer = (props) => {
  const { insurer, setInsurer } = props;

  const [addInsurerModalVisible, setAddInsurerModalVisible] = useState(false);

  const closeAddInsurerModal = () => {
    setAddInsurerModalVisible(false);
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
            onClick={() => setAddInsurerModalVisible(true)}
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

      {addInsurerModalVisible && (
        <AddInsurerModal
          closeModal={closeAddInsurerModal}
          updateContainerState={updateContainerState}
        />
      )}
    </div>
  );
};

const VehicleCard = ({ vehicle, updateContainerState }) => {
  const navigate = useNavigate();

  const vehicleId = useContext(VehicleContext);

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
    <div
      className="border p-4 m-2 cursor-pointer flex justify-between hover:outline"
      onClick={() => navigate(`/vehicle/${vehicle.id}`)}
    >
      <div>PLATE: {vehicle.plate}</div>
      <button
        className="btn"
        onClick={(e) => {
          e.stopPropagation();
          setConfirmationModalVisible(true);
        }}
      >
        DELETE
      </button>

      {confirmationModalVisible && (
        <ConfirmationPopUp
          handleCloseModal={handleCloseConfirmationModal}
          handleConfirm={handleDeleteButtonClick}
          message={'Confirm Delete'}
        />
      )}
    </div>
  );
};

export default InsurerContainer;
