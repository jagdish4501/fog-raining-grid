import React, { useState, useEffect } from 'react';
import './App.css';

const rows = 25;
const cols = 30;

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function App() {
  const [grid, setGrid] = useState(Array.from({ length: rows }, () => Array(cols).fill(0)));
  const [clicked, setClicked] = useState([]);
  const [color, setColor] = useState(getRandomColor());

  const fun = (i, j) => {
    setClicked(prev => [...prev, [i, j, 0]]);
    setColor(getRandomColor());
  };

  useEffect(() => {
    const dir = [[-1, -1], [-1, 1], [1, 1], [1, -1]];
    const interval = setInterval(() => {
      setGrid(oldGrid => {
        const newGrid = oldGrid.map(row => [...row]);

        for (let [i, j, rad] of clicked) {
          // moving in column 0->1
          for (let c = j + rad * dir[0][1]; c <= j + rad * dir[1][1]; c++) {
            if (c < cols && c >= 0 && i + rad * dir[0][0] >= 0 && i + rad * dir[0][0] < rows) {
              newGrid[i + rad * dir[0][0]][c] = 1;
            }
          }
          // moving in column 3->2
          for (let c = j + rad * dir[3][1]; c <= j + rad * dir[2][1]; c++) {
            if (c < cols && c >= 0 && i + rad * dir[2][0] >= 0 && i + rad * dir[2][0] < rows) {
              newGrid[i + rad * dir[2][0]][c] = 1;
            }
          }
          // moving in row 0->3
          for (let r = i + rad * dir[0][0]; r <= i + rad * dir[3][0]; r++) {
            if (r >= 0 && r < rows && j + rad * dir[0][1] < cols && j + rad * dir[0][1] >= 0) {
              newGrid[r][j + rad * dir[0][1]] = 1;
            }
          }
          // moving in row 1->2
          for (let r = i + rad * dir[1][0]; r <= i + rad * dir[2][0]; r++) {
            if (r >= 0 && r < rows && j + rad * dir[1][1] < cols && j + rad * dir[1][1] >= 0) {
              newGrid[r][j + rad * dir[1][1]] = 1;
            }
          }
        }

        //clearing if radius become more than grid size
        setClicked(prevClicked => prevClicked.filter(([x, y, rad]) => rad <= cols).map(([x, y, rad]) => [x, y, rad + 1]));


        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            if (oldGrid[i][j] === 1) {
              newGrid[i][j] = 0;
            }
          }
        }

        return newGrid;
      });
    }, 50);
    return () => {
      clearInterval(interval);
    };
  }, [clicked]);

  return (
    <div className="grid">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            onClick={() => fun(rowIndex, colIndex)}
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: '25px',
              height: '25px',
              backgroundColor: cell > 0 ? color : 'black'
            }}
          >
          </div>
        ))
      )}
    </div>
  );
}

export default App;
