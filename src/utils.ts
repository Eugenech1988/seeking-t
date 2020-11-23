export const generateEmptyGrid = (rowsNum: number, columnsNum: number) => {
  const rows: number[][] = [];
  for (let i = 0; i < rowsNum; i++) {
    rows.push(Array.from(Array(columnsNum), () => 0));
  }
  return rows;
};

export const generateRandomGrid = (rowsNum: number, columnsNum: number) => {
  const rows: number[][] = [];
  for (let i = 0; i < rowsNum; i++) {
    rows.push(
      Array.from(Array(columnsNum), () => (Math.random() > 0.7 ? 1 : 0))
    );
  }
  return rows;
}
