import { Tag, Loading } from '@carbon/react';
import { data } from './data.js';

export function PlantInfo({ plantId }) {
  if (!data.value) {
    return <Loading active={true} />;
  }
  const plant = data.value.find(p => p.symbol === plantId);
  return (
    <>
      <h1 style="text-transform: capitalize">{plant.commonName}</h1>
      <p><em>{plant.scientificName}</em></p>
      <p style="text-transform: lowercase">
        {plant.growthHabits.map(habit => <Tag type="green">{habit}</Tag>)}
        {plant.durations.map(duration => <Tag type="blue">{duration}</Tag>)}
        <Tag type="red">{plant.group}</Tag>
      </p>
      <img
        src={'https://plants.sc.egov.usda.gov/ImageLibrary/standard/' + plant.imageFile}
        style="max-width: 100%; max-height: 100%;"
      />
    </>
  );
}
