import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './App';


let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without crashing', () => {
  render(<App/>, container);
});

it('grid has child grid-cell', () => {
  render(<App/>, container);
  expect(container.querySelector('.grid-cell')).toBeTruthy();
});

it('grid-cell quantity is the same as expected', () => {
  render(<App/>, container);
  expect(container.querySelectorAll('.grid-cell').length).toBe(2500)
});
