import { useState } from 'preact/hooks';
import { Tag, Tile } from '@carbon/react';

export default function PlantCard({ data }) {
  const scientificName = data
            .ScientificName
            .split(/(?=<i>)/g)
            .flatMap(s => s.split(/(?<=<\/i>)/g))
            .map(s => s.startsWith('<i>') && s.endsWith('</i>')
              ? <em>{s.slice(3, s.length - 4)}</em>
              : s
            );
  const listFmt = new Intl.ListFormat('en', { type: 'unit' });
  const growthHabit = listFmt.format(data.GrowthHabits);
  const duration = listFmt.format(data.Durations);
  const imageUrl = `https://plants.sc.egov.usda.gov/ImageLibrary/standard/${data.ProfileImageFilename}`;
  return (
    <>
      <Tile>
        <h4 style="text-transform: capitalize">{data.CommonName}</h4>
        <p className="caption-01">{scientificName}</p>
        <p style="text-transform: lowercase">
          <Tag type="red">{data.Group}</Tag>
          {data.Durations.map(duration => <Tag type="blue">{duration}</Tag>)}
          {data.GrowthHabits.map(habit => <Tag type="green">{habit}</Tag>)}
        </p>
        <img src={imageUrl} style="max-width: 100%; max-height: 100%;" />
      </Tile>
    </>
  );
}
