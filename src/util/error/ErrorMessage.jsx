import React from 'react';

const ErrorMessage = (props) => {
  const { message } = props;
  return <div className='w-full text-red-500 bg-zinc-300'>{message}</div>;
};

export default ErrorMessage;
