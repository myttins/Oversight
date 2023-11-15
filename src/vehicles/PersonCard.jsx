import React, { useState } from 'react';
import PersonModal from './PersonModal';

const PersonCard = (props) => {
  const { person } = props;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <div
        className="border p-4 m-2 cursor-pointer flex justify-between"
        onClick={() => setModalVisible(true)}
      >
        <div>{person.name}</div>
        <button className='btn'>DELETE</button>
      </div>

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
