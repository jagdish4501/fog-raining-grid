import React, { useState, useEffect } from 'react';
import './App.css';

const rows = 15;
const cols = 20;
console.log(rows,cols)

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function App() {
  const [grid, setGrid] = useState(Array.from({ length: rows }, () => Array(cols).fill(0)));
  const [color, setColor] = useState(getRandomColor());

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid(oldGrid => {
        const newGrid = oldGrid.map(row => [...row]);

        // Move rain downwards
        for (let i = rows - 1; i >= 0; i--) {
          for (let j = 0; j < cols; j++) {
            if (newGrid[i][j] > 0) {
              if (i < rows - 1) {
                newGrid[i + 1][j] = newGrid[i][j];
              }
              if (newGrid[i][j] < 7)
                newGrid[i][j] = newGrid[i][j] + 1;
              else newGrid[i][j] = 0;
            }
          }
        }

        // Add new rain drops
        for (let j = 0; j < cols; j++) {
          if (Math.random() < 0.01) {
            if (newGrid[0][j] === 0) {
              newGrid[0][j] = 1;
            }
          }
        }
        return newGrid;
      });
    }, 50);

    const colorInterval = setInterval(() => {
      setColor(getRandomColor());
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <div className="grid">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
				    width:'25px',
				    height:'25px',
				    backgroundColor: cell > 0 ? `rgba(${color.slice(4, -1)}, ${(8-cell)/(7)})` : 'black'
				 }}
          />
        ))
      )}
    </div>
  );
}

export default App;
