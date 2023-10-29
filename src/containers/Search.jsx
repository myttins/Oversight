import React, { useEffect, useState } from 'react';
import VehicleRow from '../components/VehicleRow';
import { useNavigate } from 'react-router';

const Search = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [queryType, setQueryType] = useState('plate');

  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)

    const fetchDataOnLoad = async (query, queryType) => {
      const data = await sendQueryRequest(query, queryType);
      setData(data);
    }

    if (searchParams.has('query')){
      setQuery(searchParams.get('query'))
      setQueryType(searchParams.get('type'))
      fetchDataOnLoad(searchParams.get('query'), searchParams.get('type'))
    }

  }, [])

  const validateQueryInput = () => {};

  const handleSearchClick = async () => {
    setData([])
    if (query.length === 0) return;
    const data = await sendQueryRequest(query, queryType);
    setData(data);

  };

  const sendQueryRequest = async (query, queryType) => {
    const response = await fetch(
      `http://localhost:3000/vehicle?type=${queryType}&query=${query}`,
    );
    const data = await response.json();
    navigate(`/search?type=${queryType}&query=${query}`)
    return data;
  };

  return (
    <div>
      <h1 className="mt-6 text-2xl">Search</h1>

      <input
        className="border mt-6"
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <button
        className="border active:bg-violet-700"
        text={query}
        onClick={handleSearchClick}
      >
        Search
      </button>
      {data.length != 0 && (
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
