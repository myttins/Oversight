import React from 'react';

const ButtonWithIcon = ({ icon, onClick, alt, children }) => {
  return (
    <button className='w-8 h-8 rounded hover:outline outline-1 flex justify-center items-center' onClick={onClick}>
      <img className={'inline-block'} src={icon} alt={alt}></img>
      {children}
    </button>
  );
};

export default ButtonWithIcon;
