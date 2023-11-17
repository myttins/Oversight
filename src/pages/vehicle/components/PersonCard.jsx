import React, { useContext, useState } from 'react';

import axios from 'axios';
import { VehicleContext } from '../VehicleContainer.jsx';

import PersonModal from './PersonModals/PersonModal';
import ConfirmationPopUp from '../../../util/ConfirmationModal';

const PersonCard = (props) => {
  const { person, updateContainerState } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmatonModalVisible, setConfirmationModalVisible] =
    useState(false);

  const vehicleId = useContext(VehicleContext);

  const handleCloseConfirmationModal = () => {
    setConfirmationModalVisible(false);
  };

  const handleCloseDetailsModal = () => {
    setModalVisible(false);
  };

  const handleDeleteButtonClick = async () => {
    try {
      const response = await axios.delete(
        `/api/people?type=driver&vehicleid=${vehicleId}&personid=${person.id}`,
      );
      updateContainerState('delete', person);
      setConfirmationModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        className="border p-4 m-2 cursor-pointer flex justify-between"
        onClick={() => setModalVisible(true)}
      >
        <div>{person.name}</div>
        <button
          className="btn"
          onClick={(e) => {
            e.stopPropagation();
            setConfirmationModalVisible(true);
          }}
        >
          DELETE
        </button>
      </div>

      {modalVisible && (
        <PersonModal
          key={person.id}
          person={person}
          updateContainerState={updateContainerState}
          handleCloseModal={handleCloseDetailsModal}
        />
      )}

      {confirmatonModalVisible && (
        <ConfirmationPopUp
          handleCloseModal={handleCloseConfirmationModal}
          handleConfirm={handleDeleteButtonClick}
        />
      )}
    </div>
  );
};

export default PersonCard;
