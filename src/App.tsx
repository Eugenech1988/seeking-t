import React, { useState, useCallback, useRef } from 'react';
import cloneDeep from 'lodash/cloneDeep'
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

  const onGridCellClick = (rowIndex: number, colIndex: number) => () => {
    const deepGrid: number[][] = cloneDeep(grid)
    deepGrid[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1;
    setGrid(deepGrid)
  }

  const onClearClick = () => {
    setGrid(generateEmptyGrid())
  }

  return (
    <div className="app">
      <div className="buttons-wrapper">
        <button
          className='btn start-button'
        >
          Start
        </button>
        <button
          className='btn clear-button'
          onClick={onClearClick}
        >
          Clear
        </button>
        <button
          className='btn random-button'
        >
          Random
        </button>
      </div>
      <div className="grid">
        {grid.map((rows:number[], i:number) =>
          rows.map((col:number, j:number) =>
            <div
              onClick={onGridCellClick(i, j)}
              className={'grid-cell ' + (grid[i][j] ? 'active' : '')}
              key={`${i}${j}`}
            />
          ))
        }
      </div>
    </div>
  );
};

export default App;
