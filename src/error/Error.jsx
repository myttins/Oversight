import React from 'react';

const Error = (props) => {
  const { status } = props;
  return <div className="m-4 p-4 bg-white">ERROR: {status}</div>;
};

export default Error;
