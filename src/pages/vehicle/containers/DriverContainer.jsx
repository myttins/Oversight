import React from 'react';
import { useOutletContext } from 'react-router';
import translate from '../../../assets/translate';
import PersonCard from '../components/PersonCard';

const DriverContainer = (props) => {
  const { language } = useOutletContext();
  const { people } = props;

  return (
    <div className="border mt-4">
      <div className="flex justify-between">
        <h1 className="text-2xl">
          {language ? translate.driver_info[0] : translate.driver_info[1]}
        </h1>
        <button className="btn">+</button>
      </div>
      <div>
        {people.map((person) => {
          return <PersonCard key={person.id} person={person} />;
        })}
      </div>
    </div>
  );
};

export default DriverContainer;
