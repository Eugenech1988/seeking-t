export const generateGrid = (rowsNum: number, columnsNum: number, isEmpty: boolean) => {
  const rows: number[][] = [];
  for (let i = 0; i < rowsNum; i++) {
    if (isEmpty) {
      rows.push(Array.from(Array(columnsNum), () => 0));
    } else {
      rows.push(Array.from(Array(columnsNum), () => (Math.random() > 0.7 ? 1 : 0)));
    }
  }
  return rows;
};
