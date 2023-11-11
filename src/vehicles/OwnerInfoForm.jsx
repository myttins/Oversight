import React, { useState } from 'react';
import names from '../assets/names';
import AddModal from './PersonModal';
import translate from '../assets/translate';
import { useOutletContext } from 'react-router';

const OwnerInfoForm = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');

  const [showAddOwnerForm, setShowAddOwnerForm] = useState(false);

  const [language] = useOutletContext();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length === 0 || inputValue === ' ') {
      setSuggestions([]);
    } else {
      setQuery(inputValue);

      const updatedSuggestions = names.filter((name) =>
        name.toLowerCase().includes(inputValue.toLowerCase()),
      );

      setSuggestions(updatedSuggestions);
    }
  };

  return (
    <div>
      <div className="mt-6 flex justify-between">
        <h1 className="text-2xl">
          {language ? translate.owner_info[0] : translate.owner_info[1]}
        </h1>
        <button
          className="btn"
          onClick={() => setShowAddOwnerForm(!showAddOwnerForm)}
        >
          +
        </button>
      </div>
      {/* <input className="input" onChange={handleInputChange} />
      <ul>
        {suggestions.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul> */}

      {showAddOwnerForm && <AddModal showModal={setShowAddOwnerForm} />}
    </div>
  );
};

export default OwnerInfoForm;
