import React from 'react';

const ButtonWithIcon = ({ icon, onClick, alt, children, size }) => {
  return (
    <button
      className={`w-[${size || '8'}px] aspect-w-1 aspect-h-1rounded flex justify-center items-center transition duration-300 hover:scale-110`}
      onClick={onClick}
    >
      <img className={'inline-block w-full h-full'} src={icon} alt={alt}></img>
      {children}
    </button>
  );
};

export default ButtonWithIcon;
