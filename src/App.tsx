import React, { useState, useRef } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { rowsNum, columnsNum, intervalValue, acts } from './constants';
import { generateGrid } from './utils';
import './style.scss';

// on this realisation of Game Of Life - we'll use only one component and common props
interface defaultAppProps {
  rowsNum?: number,
  columnsNum?: number
  // intervalValue: number *** this case only if you'll want to pass interval time prop ***
}

const App: React.FC<defaultAppProps> = (props: defaultAppProps) => {
  const appRowsNum: number = props.rowsNum ? props.rowsNum : rowsNum;
  const appColsNum: number = props.columnsNum ? props.columnsNum : columnsNum;

  const [grid, setGrid] = useState(generateGrid(appRowsNum, appColsNum, true));
  const [isRunning, setRunning] = useState(false);

  // when we'll want to reach value of running - we need to reach link to this element, so we'll put it into ref
  const gameRunning = useRef<any>(null);

  const startGame = () => {

    let gridClone: number[][] = cloneDeep(grid);

    for (let i = 0; i < appRowsNum; i++) {
      for (let j = 0; j < appColsNum; j++) {
        let neighbors: number = 0;
        acts.forEach(([x, y]) => {
          const newI: number = i + x;
          const newJ: number = j + y;
          if (newI >= 0 && newI < appRowsNum && newJ >= 0 && newJ < appColsNum) {
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
    console.log(grid);
  };

  const onGridCellClick = (rowIndex: number, colIndex: number) => () => {
    const deepGrid: number[][] = cloneDeep(grid);
    deepGrid[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1;
    setGrid(deepGrid);
  };

  const onClearClick = () => {
    setGrid(generateGrid(appRowsNum, appColsNum, true));
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
    setGrid(generateGrid(appRowsNum, appColsNum, false));
  };

  // we can decompose our app components in future
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
      { /*this can be grid component for example*/ }
      <div className="grid">
        {grid.map((rows: number[], i: number) =>
          rows.map((col: number, j: number) =>
            // this can be grid-item component for example
            <div
              onClick={onGridCellClick(i, j)}
              className={'grid-cell ' + (grid[i][j] ? 'active' : '')}
              // for our realisation we don't need to think about unique keys - just only for this case
              key={`${i}${j}`}
            />
          ))
        }
      </div>
    </>
  );
};

export default App;
