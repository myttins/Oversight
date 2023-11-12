import React from 'react';

const ConfirmationPopUp = () => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white relative w-72 h-36 p-10"
        onClick={(e) => e.stopPropagation()}
      >
      </div>
    </div>
  );
};

export default ConfirmationPopUp;
