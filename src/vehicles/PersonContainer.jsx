import React from 'react';
import { useOutletContext } from 'react-router';
import translate from '../assets/translate';
import PersonCard from './PersonCard';

const PersonContainer = (props) => {
  const { language } = useOutletContext();
  const { type, people } = props;
  return (
    <div className="border mt-4">
      <h1 className="text-2xl">
        {language ? translate[type][0] : translate[type][1]}
      </h1>
      <div>
        {people.map((person) => {
          return <PersonCard key={person.id} person={person} />;
        })}
      </div>
    </div>
  );
};

export default PersonContainer;
