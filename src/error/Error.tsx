import React from 'react';

type ErrorPageProps = {
  status: string;
};

const Error: React.FC<ErrorPageProps> = ({ status }) => {
  return <div className="p-4 bg-white">ERROR: {status}</div>;
};

export default Error;
