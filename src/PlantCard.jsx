import { route } from 'preact-router';
import { Tag, ClickableTile } from '@carbon/react';

export function PlantCard({ data }) {
  const plantUrl = `${import.meta.env.BASE_URL}/plant/${data.symbol}`;
  return (
    <ClickableTile onClick={() => route(plantUrl)}>
      <h4 style="text-transform: capitalize">{data.commonName}</h4>
      <p className="caption-01">{data.scientificName}</p>
      <p style="text-transform: lowercase">
        {data.growthHabits.map(habit => <Tag type="green">{habit}</Tag>)}
        {data.durations.map(duration => <Tag type="blue">{duration}</Tag>)}
        <Tag type="red">{data.group}</Tag>
      </p>
      <img
        src={'https://plants.sc.egov.usda.gov/ImageLibrary/standard/' + data.imageFile}
        style="max-width: 100%; max-height: 100%;"
      />
    </ClickableTile>
  );
}
