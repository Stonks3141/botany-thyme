import { useEffect } from 'preact/hooks';
import { Loading } from '@carbon/react';
import { SearchResults } from './SearchResults.jsx';
import { data } from './data.js';

export function PlantSearch({ urlQuery, query }) {
  useEffect(() => {
    if (urlQuery) {
      query.value = urlQuery;
    }
  }, [urlQuery]);

  if (!data.value) {
    return <Loading active={true} />;
  }

  let results = data.value;
  if (query.value) {
    results = results.filter(plant => {
      const { ancestors, ...plantInfo } = plant;
      return JSON.stringify(plantInfo).toLowerCase().includes(query.value.toLowerCase())
    });
  }
  return (
    <SearchResults data={results} /> 
  );
}
