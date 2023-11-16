import React from 'react';

const ConfirmationPopUp = (props) => {
  const { handleCloseModal, handleConfirm } = props;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-white relative w-72 h-36 p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="btn" onClick={handleCloseModal}>
          X
        </button>
        <button className='btn' onClick={handleConfirm}> CONFIRM</button>
        CONFIRM DELETE?
      </div>
    </div>
  );
};

export default ConfirmationPopUp;
