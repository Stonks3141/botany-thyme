import { useState, useEffect, useRef } from 'preact/hooks';
import { Router } from 'preact-router';
import { Content, PaginationNav, Loading, Grid, Column } from '@carbon/react';
import { Header } from './Header.jsx';
import { SearchResults } from './SearchResults.jsx';

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
      <Header />
      <Content>
        {data ? <SearchResults data={data} /> : <Loading active={true} />}
      </Content>
    </>
  );

  /*return (
    <Router>
      <Home path="/" />
      <Search path="/search/:query" />
      <Plant path="/plant/:plant" />
    </Router>
  );*/
}
