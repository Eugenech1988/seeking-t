import React, { useState, useRef } from 'react';
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

const acts: number[][] = [
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


  const startGame = () => {

    const deepGrid: number[][] = cloneDeep(grid);

    for (let i = 0; i < rowsNum; i++) {
      for (let j = 0; j < columnsNum; j++) {
        let neighbors = 0;
        acts.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;
          if (newI >= 0 && newI < rowsNum && newJ >= 0 && newJ < columnsNum) {
            neighbors += grid[newI][newJ];
          }
        });
        if (neighbors < 2 || neighbors > 3) {
          deepGrid[i][j] = 0;
        } else if (grid[i][j] === 0 && neighbors === 3) {
          deepGrid[i][j] = 1;
        }
      }
    }
    setGrid(deepGrid);
    console.log(grid);
  };

  const onGridCellClick = (rowIndex: number, colIndex: number) => () => {
    const deepGrid: number[][] = cloneDeep(grid);
    deepGrid[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1;
    setGrid(deepGrid);
  };

  const onClearClick = () => {
    setGrid(generateEmptyGrid());
  };

  const gameRunning = useRef<any>(null);

  const onStartClick = () => {
    if (!isRunning) {
      gameRunning.current = setInterval(startGame, 1000)
    } else {
      clearInterval(gameRunning.current)
    }
    setRunning(!isRunning)
  };

  const onRandomClick = () => {
    const rows: number[][] = [];
    for (let i = 0; i < rowsNum; i++) {
      rows.push(
        Array.from(Array(columnsNum), () => (Math.random() > 0.7 ? 1 : 0))
      );
    }
    setGrid(rows);
  }

  return (
    <>
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
          onClick={onRandomClick}
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
    </>
  );
};

export default App;
