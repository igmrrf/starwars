import React, { useState } from 'react';
import Planet from './Planet';
import { useInfiniteQuery, useQuery } from 'react-query';

const fetchPlanets = async (key: any) => {
  console.log(key);
  const param = key?.queryKey[2];
  const res = await fetch(`http://swapi.dev/api/planets/?page=${param}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(
    ['planets', 'Hello, Onichan', page],
    fetchPlanets,
    {
      staleTime: 2000,
      cacheTime: 500000,
    }
  );

  return (
    <div>
      <h2>Planet</h2>
      <p>Page: {page}</p>
      {status === 'success' && <p>Page Limit: {data.count / 10}</p>}
      <button
        onClick={() => {
          setPage((prevPage) => Math.min(prevPage + 1, 6));
        }}
      >
        Next Page
      </button>
      <button
        onClick={() => {
          setPage((prevPage) => Math.max(prevPage - 1, 1));
        }}
      >
        Previous Page
      </button>
      {status === 'loading' && <div>Loading data</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <div>
          {data.results.map((planet: {}, index: number) => (
            <Planet planet={planet} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
