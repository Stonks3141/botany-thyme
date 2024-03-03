import { useEffect, useRef } from 'preact/hooks';
import { useSignal } from '@preact/signals';
import { PaginationNav, Grid, Column } from '@carbon/react';
import { PlantCard } from './PlantCard.jsx';

export function SearchResults({ data }) {
  const page = useSignal(0);
  const perPage = 10;

  const itemsShown = useSignal(5);
  const ref = useRef(null);
  useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth : window.innerWidth;
    itemsShown.value = Math.floor(width / 48) - 1;
  }, [ref.current]);

  return (
    <>
      <Grid>
        {data.slice(page.value * perPage, (page.value + 1) * perPage).map(plant =>
          <Column sm={4} md={4} lg={4}><PlantCard data={plant} /></Column>
        )}
      </Grid>
      <div ref={ref} style="overflow-x: auto">
        <PaginationNav
          page={page.value}
          onChange={n => page.value = n}
          itemsShown={itemsShown.value}
          totalItems={data ? Math.ceil(data.length / perPage) : 0}
        />
      </div>
    </>
  );
}
