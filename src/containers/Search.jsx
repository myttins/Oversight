import React, { useEffect, useState } from 'react';
import VehicleRow from '../components/VehicleRow';
import { useNavigate } from 'react-router';

const Search = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [queryType, setQueryType] = useState('plate');

  const navigate = useNavigate();

  /**
   * Sends search query using URL params when page is refreshed in order to keep search results
   */
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const fetchDataOnLoad = async (query, queryType) => {
      const data = await sendQueryRequest(query, queryType);
      setData(data);
    };

    if (searchParams.has('query')) {
      setQuery(searchParams.get('query'));
      setQueryType(searchParams.get('type'));
      fetchDataOnLoad(searchParams.get('query'), searchParams.get('type'));
    }
  }, []);

  /**
   * @TODO Create function that validates search input
   */
  const validateQueryInput = () => {};

  const handleSearchClick = async () => {
    if (input.length === 0) return;
    setData([]);
    setQuery(input);
    const data = await sendQueryRequest(input, queryType);
    setData(data);
    setInput('');
  };

  const sendQueryRequest = async (input, queryType) => {
    const response = await fetch(
      `http://localhost:3000/vehicle?type=${queryType}&query=${input}`,
    );
    const data = await response.json();
    navigate(`/search?type=${queryType}&query=${input}`);
    return data;
  };

  return (
    <div>
      <h1 className="mt-6 text-2xl">Search</h1>
      <div>
        <input
          className="border mt-6"
          placeholder={`Search by ${queryType}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button
          className="border active:bg-violet-700 px-4"
          text={query}
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
      <div className='my-2'>
        <label>
          <input
            type="radio"
            name="driver"
            checked={queryType === 'plate'}
            onChange={() => setQueryType('plate')}
          />
          Plate
        </label>
        <label className="px-4">
          <input
            type="radio"
            name="driver"
            checked={queryType === 'driver'}
            onChange={() => setQueryType('driver')}
          />
          Driver
        </label>
      </div>

      {query.length != 0 && (
        <div>
          <h1>Showing results for: '{query}'</h1>
          <div className="mt-6 flex w-full border-b-2">
            <a className="w-2/6">Plate</a>
            <a className="w-4/6">Drivers</a>
          </div>
          <div>
            {data.map((data, index) => {
              return <VehicleRow key={data.id} data={data} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
