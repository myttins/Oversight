import React, { useState } from 'react';
import { useOutletContext } from 'react-router';
import translate from '../assets/translate';
import AddModal from './AddModal';

const InsurerInfoForm = () => {

  const [showAddInsurerModal, setShowAddInsurerModal] = useState(false)
  const [language] = useOutletContext();


  return (
    <div>
      <div className="mt-6 flex justify-between">
        <h1 className="text-2xl">
          {language ? translate.insurer_info[0] : translate.insurer_info[1]}
        </h1>
        <button
          className="btn"
          onClick={() => setShowAddInsurerModal(true)}
        >
          +
        </button>
      </div>
      {showAddInsurerModal && <AddModal showModal={setShowAddInsurerModal} />}
    </div>
  );
};

export default InsurerInfoForm;
