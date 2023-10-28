import React, { useEffect, useState } from 'react';
import VehicleRow from '../components/VehicleRow';

const Search = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [queryType, setQueryType] = useState('plate');

  // useEffect(() => {
  //   console.log(1)
  // }, [query])

  const validateQueryInput = () => {};

  const handleSearchClick = async () => {
    if (query.length === 0) return;
    const data = await sendQueryRequest(query, queryType)
    console.log(data)
    setData(data);
  };

  const sendQueryRequest = async (query, queryType) => {
    const response = await fetch(
      `http://localhost:3000/vehicle?type=${queryType}&query=${query}`,
    );
    const data = await response.json();
    return data;
  };

  return (
    <div>
      <input
        className="border"
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

      <h1 className="mt-6 text-2xl">Vehicle</h1>
      <div className="mt-6 flex w-full border-b-2">
        <a className="w-2/6">Plate</a>
        <a className="w-1/6">Year</a>
        <a className="w-1/6">Model</a>
      </div>
      <div>
        {data.map((data, index) => {
          return <VehicleRow key={data.id} data={data} />;
        })}
      </div>
    </div>
  );
};

export default Search;
