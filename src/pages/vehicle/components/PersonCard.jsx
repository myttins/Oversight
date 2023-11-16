import React, { useState } from 'react';
import PersonModal from './PersonModal';
import ConfirmationPopUp from '../../../util/ConfirmationModal';

const PersonCard = (props) => {
  const { person, handleDelete } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmatonModalVisible, setConfirmationModalVisible] =
    useState(false);

  const handleCloseConfirmationModal = () => {
    setConfirmationModalVisible(false);
  };

  const handleDeleteButtonClick = (e) => {
    e.stopPropagation();
    setConfirmationModalVisible(true);
  };

  return (
    <div>
      <div
        className="border p-4 m-2 cursor-pointer flex justify-between"
        onClick={() => setModalVisible(true)}
      >
        <div>{person.name}</div>
        <button className="btn" onClick={handleDeleteButtonClick}>
          DELETE
        </button>
      </div>

      {modalVisible && (
        <PersonModal
          key={person.id}
          person={person}
          setModalVisible={setModalVisible}
        />
      )}

      {confirmatonModalVisible && (
        <ConfirmationPopUp
          handleCloseModal={handleCloseConfirmationModal}
          handleConfirm={(e) => {
            handleDelete(e, person.foreign_id)
            setConfirmationModalVisible(false)
          }}
        />
      )}
    </div>
  );
};

export default PersonCard;
