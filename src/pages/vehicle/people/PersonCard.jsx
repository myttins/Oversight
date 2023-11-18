import React, { useContext, useState } from 'react';

import axios from 'axios';
import { VehicleContext } from '../VehicleContainer.jsx';

import PersonModal from './PersonModal.jsx';
import ConfirmationPopUp from '../../../util/ConfirmationModal.jsx';

const PersonCard = (props) => {
  const { person, updateContainerState, driverOrOwner } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmatonModalVisible, setConfirmationModalVisible] =
    useState(false);

  const vehicleId = useContext(VehicleContext);

  const handleCloseConfirmationModal = () => {
    setConfirmationModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(() => false);
  };

  const handleDeleteButtonClick = async () => {
    try {
      await axios.delete(
        `/api/people?type=${driverOrOwner}&vehicleid=${vehicleId}&personid=${person.id}`,
      );
      updateContainerState('delete', person);
      setConfirmationModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="border p-4 m-2 cursor-pointer flex justify-between hover:outline"
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

      {modalVisible && (
        <PersonModal
          key={person.id}
          person={person}
          updateContainerState={updateContainerState}
          handleCloseModal={handleCloseModal}
        />
      )}

      {confirmatonModalVisible && (
        <ConfirmationPopUp
          handleCloseModal={handleCloseConfirmationModal}
          handleConfirm={handleDeleteButtonClick}
          message={'Confirm Delete'}
        />
      )}
    </div>
  );
};

export default PersonCard;
