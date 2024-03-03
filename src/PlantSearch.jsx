import { useComputed } from '@preact/signals';
import { Loading } from '@carbon/react';
import { SearchResults } from './SearchResults.jsx';
import { data } from './data.js';

export function PlantSearch({ query }) {
  if (!data.value) {
    return <Loading active={true} />;
  }
  //const results = useComputed(() => data.value.filter(plant => !query.value || plant.commonName.toLowerCase().includes(query.value.toLowerCase())));

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
