import { useState, useEffect, useRef } from 'preact/hooks';
import { PaginationNav, Grid, Column } from '@carbon/react';
import { PlantCard } from './PlantCard.jsx';

export function SearchResults({ data }) {
  const [page, setPage] = useState(0);
  const perPage = 10;

  const [itemsShown, setItemsShown] = useState(5);
  const ref = useRef(null);
  useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth : window.innerWidth;
    setItemsShown(Math.floor(width / 48) - 1);
  }, [ref.current]);

  return (
    <>
      <Grid>
        {data.slice(page * perPage, (page + 1) * perPage).map(plant =>
          <Column sm={4} md={4} lg={4}><PlantCard data={plant} /></Column>
        )}
      </Grid>
      <div ref={ref} style="overflow-x: auto">
        <PaginationNav
          page={page}
          onChange={n => setPage(n)}
          itemsShown={itemsShown}
          totalItems={data ? Math.ceil(data.length / perPage) : 0}
        />
      </div>
    </>
  );
}
