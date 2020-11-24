export const generateGrid = (rowsNum: number, columnsNum: number, isEmpty: boolean) => {
  const rows: number[][] = [];
  for (let i = 0; i < rowsNum; i++) {
    rows.push(Array.from(Array(columnsNum), () => (isEmpty ? 0 : (Math.random() > 0.7 ? 1 : 0))));
  }
  return rows;
};
