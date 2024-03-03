import { useSignal } from '@preact/signals';
import { Router } from 'preact-router';
import { Content } from '@carbon/react';
import { Header } from './Header.jsx';
import { Home } from './Home.jsx';
import { PlantSearch } from './PlantSearch.jsx';
import { PlantInfo } from './PlantInfo.jsx';

export function App() {
  const query = useSignal('');
  const base = import.meta.env.BASE_URL;
  return (
    <>
      <Header query={query} />
      <Content>
        <Router>
          <Home path={`${base}/`} />
          <PlantSearch path={`${base}/search/:urlQuery?`} query={query} />
          <PlantInfo path={`${base}/plant/:plantId`} />
        </Router>
      </Content>
    </>
  );
}
