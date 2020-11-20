import React, { useState, useCallback, useRef } from 'react';
import './style.scss'


const rowsNum: number = 50;
const columnsNum: number = 50;

const generateEmptyGrid = () => {
  const rows: number[][] = [];
  for (let i = 0; i < rowsNum; i++) {
    rows.push(Array.from(Array(columnsNum), () => 0));
  }
  return rows;
};

const App: React.FC = () => {
  const [grid, setGrid] = useState(generateEmptyGrid());
  const [started, setStarted] = useState(false)
  // console.log(grid);

  const onGridCellClick = () => {
    console.log('clicked');
  }

  return (
    <div className="app">
      <div className="buttons-wrapper">
        <button
          className='start-button'
        />
        <button
          className='clear-button'
        />
        <button
          className='random-button'
        />
      </div>
      <div className="grid">
        {grid.map((rows, i) =>
          rows.map((col, j) =>
            <div
              onClick={onGridCellClick}
              className='grid-cell'
              key={`${i}${j}`}
            />
          ))
        }
      </div>
    </div>
  );
};

export default App;
