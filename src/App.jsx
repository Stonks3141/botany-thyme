import { useState, useEffect } from 'preact/hooks';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, ExpandableSearch, PaginationNav, Loading, Grid, Column } from '@carbon/react';
import PlantCard from './PlantCard.jsx';

export function App() {
  const [page, setPage] = useState(0);
  const perPage = 10;

  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'plants.json')
      .then(res => res.json())
      .then(json => setData(json));
  });

  return (
    <>
      <Header aria-label="Botany Thyme">
        <HeaderName href="/" prefix="">Botany Thyme</HeaderName>
        <HeaderGlobalBar>
          <ExpandableSearch size="lg" labelText="Search for plants" />
        </HeaderGlobalBar>
      </Header>
      {data === null
        ? <Loading active={true} />
        : <>
            <Grid as="main">
              {data.slice(page * perPage, (page + 1) * perPage).map(plant =>
                <Column sm={4} md={4} lg={4}><PlantCard data={plant} /></Column>
              )}
            </Grid>
            <footer className="cds--footer">
              <PaginationNav
                page={page}
                onChange={n => setPage(n)}
                totalItems={Math.ceil(data.length / perPage)}
              />
            </footer>
          </>
      }
    </>
  );
}
