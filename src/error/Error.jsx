import React from 'react';

const Error = (props) => {
  const { status } = props;
  return <div>Error: {status}</div>;
};

export default Error;
