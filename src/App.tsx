import React, { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import './style.scss';


const rowsNum: number = 50;
const columnsNum: number = 50;

const generateEmptyGrid = () => {
  const rows: number[][] = [];
  for (let i = 0; i < rowsNum; i++) {
    rows.push(Array.from(Array(columnsNum), () => 0));
  }
  return rows;
};

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const App: React.FC = () => {
  const [grid, setGrid] = useState(generateEmptyGrid());
  const [isRunning, setRunning] = useState(false);
  // console.log(grid);

  // const runningRef = ()

  const startGame = () => {
    if (!isRunning)
      return

    const deepGrid: number[][] = cloneDeep(grid)

    const setGameRules = () => {
      for (let i = 0; i < rowsNum; i++) {
        for (let j = 0; j < columnsNum; j++) {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newK = j + y;
            if (newI >= 0 && newI < rowsNum && newK >= 0 && newK < columnsNum) {
              neighbors += grid[newI][newK];
            }
          });

          if (neighbors < 2 || neighbors > 3) {
            deepGrid[i][j] = 0;
          } else if (grid[i][j] === 0 && neighbors === 3) {
            deepGrid[i][j] = 1;
          }
        }
      }
      return deepGrid
    }

    setGrid(setGameRules())

    setTimeout(startGame, 100)
  }

  const onGridCellClick = (rowIndex: number, colIndex: number) => () => {
    const deepGrid: number[][] = cloneDeep(grid);
    deepGrid[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1;
    setGrid(deepGrid);
  };

  const onClearClick = () => {
    setGrid(generateEmptyGrid());
  };

  const onStartClick = () => {
    setRunning(!isRunning);
    if(!isRunning)
      startGame()
  };

  return (
    <div className="app">
      <div className="buttons-wrapper">
        <button
          className='btn start-button'
          onClick={onStartClick}
        >
          {!isRunning ? 'Start' : 'Stop'}
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
        {grid.map((rows: number[], i: number) =>
          rows.map((col: number, j: number) =>
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
