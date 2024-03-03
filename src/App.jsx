import { useState, useEffect, useLayoutEffect, useRef } from 'preact/hooks';
import { Header, Content, HeaderName, HeaderGlobalBar, HeaderGlobalAction, ExpandableSearch, PaginationNav, Loading, Grid, Column } from '@carbon/react';
import PlantCard from './PlantCard.jsx';

export function App() {
  const [page, setPage] = useState(0);
  const perPage = 10;

  const [itemsShown, setItemsShown] = useState(5);
  const ref = useRef(null);
  useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth : window.innerWidth;
    setItemsShown(Math.floor(width / 48) - 1);
  }, [ref.current]);

  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'plants.json')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  return (
    <>
      <Header aria-label="Botany Thyme">
        <HeaderName href="/" prefix="">Botany Thyme</HeaderName>
        <HeaderGlobalBar>
          <ExpandableSearch size="lg" labelText="Search for plants" />
          <HeaderGlobalAction>
            <svg width="25" height="24" viewBox="0 0 98 96">
              <path fill="#24292f" d="M49 0a49 49 0 0 0-15 96c2 0 3-1 3-2V84c-14 3-17-5-17-5-2-6-5-8-5-8-5-3 0-3 0-3 5 1 8 5 8 5 4 8 11 6 14 4 0-3 2-5 3-6-11-1-22-5-22-24 0-6 2-10 5-14-1-1-2-6 0-13 0 0 4-1 14 5a47 47 0 0 1 12-1l12 1c9-6 13-5 13-5 3 7 1 12 1 13 3 4 5 8 5 14 0 19-11 23-22 24 1 1 3 4 3 9v14c0 1 1 2 3 2 20-7 34-25 34-47C98 22 76 0 49 0z"/>
            </svg>
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
      <Content>
        {data === null
          ? <Loading active={true} />
          : <Grid as="main">
              {data.slice(page * perPage, (page + 1) * perPage).map(plant =>
                <Column sm={4} md={4} lg={4}><PlantCard data={plant} /></Column>
              )}
            </Grid>
        }
      </Content>
      <footer ref={ref} className="cds--footer" style="overflow-x: hidden">
        <PaginationNav
          page={page}
          onChange={n => setPage(n)}
          itemsShown={itemsShown}
          totalItems={data ? Math.ceil(data.length / perPage) : 0}
        />
      </footer>
    </>
  );
}
