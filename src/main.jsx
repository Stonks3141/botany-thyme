import { render } from 'preact';
import { App } from './App.jsx';
import { loadData } from './data.js';
import './index.scss';

loadData();
render(<App />, document.body);
