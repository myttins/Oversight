import React from 'react';

type ErrorPageProps = {
  status: string;
}

const Error = (props: ErrorPageProps) => {
  const { status } = props;
  return <div className="p-4 bg-white">ERROR: {status}</div>;
};

export default Error;
