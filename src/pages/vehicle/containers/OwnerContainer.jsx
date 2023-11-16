import React from 'react';
import { useOutletContext } from 'react-router';
import translate from '../../../assets/translate';
import PersonCard from '../components/PersonCard';

const OwnerContainer = (props) => {
  const { language } = useOutletContext();
  const { owner, setOwner } = props;

  return (
    <div className="border mt-4">
      <div className="flex justify-between">
        <h1 className="text-2xl">
          {language ? translate.owner_info[0] : translate.owner_info[1]}
        </h1>
        {owner.length === 0 && <button className="btn">+</button>}
      </div>

      <div>
        {owner.map((person) => {
          return <PersonCard key={person.id} person={person} />;
        })}
      </div>
    </div>
  );
};

export default OwnerContainer;
