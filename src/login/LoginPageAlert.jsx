import React from 'react';

const LoginPageAlert = (props) => {
  const { message } = props;
  return <div className="border bg-red-300">{message}</div>;
};

export default LoginPageAlert;
