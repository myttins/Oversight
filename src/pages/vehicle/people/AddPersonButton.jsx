import React, { useState } from 'react';
import AddPersonModal from './AddPersonModal';

const AddPersonButton = (props) => {
  const [personModalVisible, setPersonModalVisible] = useState(false);

  const { updateContainerState, driverOrOwner} = props;

  const handleCloseModal = () => {
    setPersonModalVisible(false);
  };
  return (
    <div>
      <button className="btn" onClick={() => setPersonModalVisible(true)}>
        +
      </button>
      {personModalVisible && (
        <AddPersonModal
          handleCloseModal={handleCloseModal}
          updateContainerState={updateContainerState}
          driverOrOwner={driverOrOwner}
        />
      )}
    </div>
  );
};

export default AddPersonButton;
