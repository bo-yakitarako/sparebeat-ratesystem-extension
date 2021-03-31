import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';

const classDom = document.getElementsByClassName('music-list-header-title');
const header =
  classDom.length > 0 ? (classDom[0] as HTMLDivElement) : undefined;

if (typeof header !== 'undefined') {
  render(<App />, header);
}
