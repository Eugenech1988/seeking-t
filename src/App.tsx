import React, { useState, useRef } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { rowsNum, columnsNum, intervalValue, acts } from './constants';
import './style.scss';


const generateEmptyGrid = () => {
  const rows: number[][] = [];
  for (let i = 0; i < rowsNum; i++) {
    rows.push(Array.from(Array(columnsNum), () => 0));
  }
  return rows;
};

// it's simple app so we don't need to create interface for App component because it's only for demo, to describe props behaviour we need to create separate components

const App: React.FC = () => {
  const [grid, setGrid] = useState(generateEmptyGrid());
  const [isRunning, setRunning] = useState(false);

  const gameRunning = useRef<any>(null);

  const startGame = () => {

    let gridClone: number[][] = cloneDeep(grid);

    for (let i = 0; i < rowsNum; i++) {
      for (let j = 0; j < columnsNum; j++) {
        let neighbors: number = 0;
        acts.forEach(([x, y]) => {
          const newI: number = i + x;
          const newJ: number = j + y;
          if (newI >= 0 && newI < rowsNum && newJ >= 0 && newJ < columnsNum) {
            neighbors += grid[newI][newJ];
          }
        });
        if (neighbors < 2 || neighbors > 3) {
          gridClone[i][j] = 0;
        } else if (grid[i][j] === 0 && neighbors === 3) {
          gridClone[i][j] = 1;
        }
      }
    }

    setGrid(grid => gridClone);
    console.log(gridClone);
  };

  const onGridCellClick = (rowIndex: number, colIndex: number) => () => {
    const deepGrid: number[][] = cloneDeep(grid);
    deepGrid[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1;
    setGrid(deepGrid);
  };

  const onClearClick = () => {
    setGrid(generateEmptyGrid());
  };

  const onStartClick = () => {
    if (!isRunning) {
      startGame();
      gameRunning.current = setInterval(startGame, intervalValue);
    } else {
      clearInterval(gameRunning.current);
    }
    setRunning(!isRunning);
  };

  const onRandomClick = () => {
    const rows: number[][] = [];
    for (let i = 0; i < rowsNum; i++) {
      rows.push(
        Array.from(Array(columnsNum), () => (Math.random() > 0.7 ? 1 : 0))
      );
    }
    setGrid(rows);
  };

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
