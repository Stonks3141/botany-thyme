import { useState, useEffect } from 'preact/hooks';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, ExpandableSearch, PaginationNav, Loading } from '@carbon/react';
import PlantCard from './PlantCard.jsx';

export function App() {
  const [page, setPage] = useState(0);
  const perPage = 10;

  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/plants.json')
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
            {data.slice(page * perPage, (page + 1) * perPage).map(plant => <PlantCard data={plant} />)}
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
