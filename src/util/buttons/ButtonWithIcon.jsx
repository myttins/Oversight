import React from 'react';

const ButtonWithIcon = ({ icon, onClick, alt, children }) => {
  return (
    <button
      className="w-8 h-8 rounded flex justify-center items-center transition duration-300 hover:scale-110"
      onClick={onClick}
    >
      <img className={'inline-block w-full h-full'} src={icon} alt={alt}></img>
      {children}
    </button>
  );
};

export default ButtonWithIcon;
