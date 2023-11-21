import React from 'react';

const ConfirmationPopUp = ({isOpen, onClose, onConfirm, message}) => {

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white relative w-96 h-60 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="btn absolute top-4 right-4"
          onClick={onClose}
        >
          X
        </button>
        <div className="mt-20 flex justify-around">{message}</div>
        <div className="w-full flex justify-between mt-20">
          <button className="btn" onClick={onClose}>
            CANCEL
          </button>
          <button className="btn-red" onClick={onConfirm}>
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopUp;
