import React from 'react';
import { useOutletContext, useParams } from 'react-router';

const Vehicle = () => {
  const [english, setEnglish] = useOutletContext();
  let { id } = useParams();
  return <div>Vehicle, {id}</div>;
};

export default Vehicle;
