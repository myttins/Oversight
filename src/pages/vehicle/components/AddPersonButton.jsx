import React, { useState } from 'react';
import axios from 'axios';
import PersonModal from './PersonModals/PersonModal';
import AddPersonModal from './PersonModals/AddPersonModal';

const AddPersonButton = (props) => {
  const [personModalVisible, setPersonModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { handleSubmit, updateContainerState} = props;

  const handleNewPersonAdd = async () => {
    if (!personInfo.id) return;

    try {
      // Verify that input id does not already exist
      if (await checkIfIdExists(personInfo.id)) {
        setErrorMessage('ID already exists');
        return;
      } 

      handleSubmit(personInfo);
      setPersonModalVisible(false);
      setPersonInfo({});
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfIdExists = async (id) => {
    try {
      const response = await axios.get(`/api/people/${id}`)
      
      if (response.data.length !== 0) return true
      return false;

    } catch (error) {
      console.error(error)
    }
  };

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
          person={{}}
          handleSubmit={handleNewPersonAdd}
          updateContainerState={updateContainerState}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

export default AddPersonButton;
