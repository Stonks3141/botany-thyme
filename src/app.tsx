import { useState } from 'preact/hooks';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, ExpandableSearch, PaginationNav } from '@carbon/react';
import data from './plants.json';
import PlantCard from './PlantCard.tsx';

export function App() {
  const [page, setPage] = useState(0);
  const perPage = 10;
  return (
    <>
      <Header aria-label="Botany Thyme">
        <HeaderName href="/" prefix="">Botany Thyme</HeaderName>
        <HeaderGlobalBar>
          <ExpandableSearch size="lg" labelText="Search for plants" />
        </HeaderGlobalBar>
      </Header>
      {data.slice(page * perPage, (page + 1) * perPage).map(plant => <PlantCard data={plant} />)}
      <footer className="cds--footer">
        <PaginationNav
          page={page}
          onChange={n => setPage(n)}
          totalItems={Math.ceil(data.length / perPage)}
        />
      </footer>
    </>
  );
}
