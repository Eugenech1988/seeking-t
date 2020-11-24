import { useEffect, useRef } from 'react';


export const generateGrid = (rowsNum: number, columnsNum: number, isEmpty: boolean) => {
  const rows: number[][] = [];
  for (let i = 0; i < rowsNum; i++) {
    rows.push(Array.from(Array(columnsNum), () => (isEmpty ? 0 : (Math.random() > 0.7 ? 1 : 0))));
  }
  return rows;
};


export const useInterval = (callback: any, delay: number) => {
  const savedCallbackRef = useRef<any>(null);

  useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (...args: any) => {
      if (savedCallbackRef.current) {
        savedCallbackRef.current(...args);
      }
    };
    if (delay !== null) {
      const intervalId = setInterval(handler, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
};

