import React from 'react';
import { useOutletContext } from 'react-router';
import axios from 'axios';

import translate from '../../../assets/translate';
import PersonCard from '../components/PersonCard';

const OwnerContainer = (props) => {
  const { language } = useOutletContext();
  const { owner, setOwner} = props;

  const handleDelete = async (e, id) => {
    // send request to remove person server-side
    e.stopPropagation();
    const response = await axios.delete(`/api/people?type=owner&id=${id}`);

    // remove person from state
    setDrivers([]);
  };

  return (
    <div className="border mt-4">
      <div className="flex justify-between">
        <h1 className="text-2xl">
          {language ? translate.owner_info[0] : translate.owner_info[1]}
        </h1>
        {owner.length === 0 && <button className="btn">+</button>}
      </div>

      <div>
        {owner.map((person, i) => {
          return (
            <PersonCard
              key={person.id}
              person={person}
              index={i}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OwnerContainer;
