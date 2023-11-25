import React from 'react';

type LoginPageAlertProps = {
  message: string;
};
const LoginPageAlert: React.FC<LoginPageAlertProps> = ({ message }) => {
  return <div className="border bg-red-300">{message}</div>;
};

export default LoginPageAlert;
