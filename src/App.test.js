import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { generateEmptyGrid } from './utils';
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

it('grid has child with class name grid-cell', () => {
  render(<App/>, container);
  expect(container.querySelector('.grid-cell')).toBeTruthy();
});

it('grid-cells quantity is the same as expected', () => {
  // setting props for app
  const rowsNum = 10;
  const colsNum = 20;

  render(
    <App
      rowsNum={rowsNum}
      columnsNum={colsNum}
    />,
    container);
  expect(container.querySelectorAll('.grid-cell').length).toBe(rowsNum * colsNum);
});

it('could render empty grid', () => {
  const rowsNum = 10;
  const colsNum = 20;
  const emptyGrid = generateEmptyGrid(rowsNum, colsNum);
  const zeroArray = emptyGrid.every(item => item.every(childItem => childItem === 0));

  expect(zeroArray).toBe(true)
});
