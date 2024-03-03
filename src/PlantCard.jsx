import { useState } from 'preact/hooks';
import { Tag, Tile } from '@carbon/react';

export default function PlantCard({ data }) {
  return (
    <>
      <Tile>
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
      </Tile>
    </>
  );
}
