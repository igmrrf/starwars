import React, { useState } from 'react';
import Planet from './Planet';
import { useInfiniteQuery, useQuery } from 'react-query';

const fetchPlanets = async (param) => {
  console.log(param);

  const res = await fetch(`http://swapi.dev/api/planets/?page=${param}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  // const { data, status } = useQuery(
  //   ['planets', 'Hello, Onichan', page],
  //   fetchPlanets,
  //   {
  //     staleTime: 2000,
  //     cacheTime: 500000,
  //   }
  // );
  const { data, status, fetchNextPage, fetchPreviousPage } = useInfiniteQuery(
    'planets',
    ({ pageParam = page }) => fetchPlanets(pageParam)
  );
  console.log(useInfiniteQuery('planets', fetchPlanets));

  const planets = data?.pages[0];

  return (
    <div>
      <h2>Planet</h2>
      <p>Page: {page}</p>
      {status === 'success' && <p>Page Limit: {planets.count / 10}</p>}
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
          {planets.results.map((planet, index) => (
            <Planet planet={planet} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
