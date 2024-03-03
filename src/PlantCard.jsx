import { useState } from 'preact/hooks';
import { Tile } from '@carbon/react';

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
        <p>
          Scientific name: {scientificName}
        </p>
        <p>
          Group: <span style="text-transform: lowercase">{data.Group}</span>
        </p>
        <p>
          Growth habit: <span style="text-transform: lowercase">{growthHabit}</span>
        </p>
        <p>
          Duration: <span style="text-transform: lowercase">{duration}</span>
        </p>
        <img src={imageUrl} />
      </Tile>
    </>
  );
}
