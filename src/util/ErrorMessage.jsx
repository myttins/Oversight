import React from 'react';

const ErrorMessage = (props) => {
  const { message } = props;
  return <div className='w-full text-red-500 bg-slate-300'>{message}</div>;
};

export default ErrorMessage;
