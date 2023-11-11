import React, { useState } from 'react';
import PersonModal from './PersonModal';

const PersonCard = (props) => {
  const { person } = props;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="border m-2 cursor-pointer">
      <div className='p-4' onClick={() => setModalVisible(true)}>{person.name}</div>
      {modalVisible && (
        <PersonModal
          key={person.id}
          person={person}
          setModalVisible={setModalVisible}
        />
      )}
    </div>
  );
};

export default PersonCard;
