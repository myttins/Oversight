import React, { useContext, useEffect, useState } from 'react';
import VehicleRow from './util/VehicleRow.jsx';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { MessageBannerContext } from '../../util/MessageBannerContext';

const Search = () => {
  // User inputs
  const [input, setInput] = useState('');
  const [searchBy, setSearchBy] = useState('plate');
  const [searchResults, setSearchResults] = useState([]);

  // URL params
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');

  let location = useLocation();

  const { showBanner, hideBanner } = useContext(MessageBannerContext);

  const handleSearchSubmit = (e) => {
    // navigate to url
    e.preventDefault();
    setSearchParams({ type: searchBy, query: input });
    setSearchTerm(input);
  };

  useEffect(() => {
    if (searchTerm === '') {
      setSearchResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        showBanner({ style: 'loading' });
        const response = await axios.get(
          `/api/vehicle?type=${searchBy}&query=${searchTerm}`,
        );
        setSearchResults(response.data);
        hideBanner();
      } catch (error) {
        showBanner({ style: 'error', message: error.response.data.message });
        console.error(error);
      }
    };
    fetchData();
  }, [location]);

  return (
    <div className="border p-4 bg-white">
      <h1 className="mt-6">VEHICLE SEARCH</h1>
      <form>
        <input
          className="input"
          placeholder={`SEARCH BY ${searchBy}`}
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
        ></input>
        <button type="submit" className="btn" onClick={handleSearchSubmit}>
          SEARCH
        </button>
      </form>
      <div className="my-2">
        <label>
          <input
            type="radio"
            name="driver"
            checked={searchBy === 'plate'}
            onChange={() => setSearchBy('plate')}
          />
          PLATE
        </label>
        <label className="px-4">
          <input
            type="radio"
            name="driver"
            checked={searchBy === 'driver'}
            onChange={() => setSearchBy('driver')}
          />
          PEOPLE
        </label>
      </div>

      {searchResults.length != 0 && (
        <div>
          <h1>Showing results for: '{searchTerm}'</h1>
          <div className="mt-6 flex w-full border-b-2">
            <a className="w-1/6">PLATE</a>
            <a className="w-2/6">OWNER</a>
            <a className="w-3/6">DRIVER</a>
          </div>
          <div>
            {searchResults.map((data, index) => {
              return <VehicleRow key={data.id} data={data} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
