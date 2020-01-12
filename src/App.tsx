import React, { useEffect, useState } from 'react';
import './App.css';
import Block from './components/Block';
import Map from './components/Map';
import Direction from './utils/Direction'

const BlockSize = 4;



const getRandomIntInclusive = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

const addValue = (map: number[][]) => {
  while(true) {
    const x = getRandomIntInclusive(0, BlockSize - 1);
    const y = getRandomIntInclusive(0, BlockSize - 1);
    if (map[y][x] === 0) {
      map[y][x] = getRandomIntInclusive(0, 5) > 0 ? 2 : 4;
      return;
    }
  };
};

const initMap = (): number[][] => {
  let map = Array(BlockSize).fill([]).map(() => Array(BlockSize).fill(0));
  addValue(map);
  addValue(map);
  return map;
}

const transpose = (matrix: number[][]): number[][] => {
  return matrix.reduce((newMatrix: number[][], row: number[], i: number, ar: number[][]) => [...newMatrix, ar.map(_ => _[i])], []);
};

const turnTo = (matrix: number[][], direction: Direction): number[][] => {
  switch(direction) {
    case Direction.Left: return matrix;
    case Direction.Right: return matrix.map(_ => _.reverse());
    case Direction.Up: return transpose(matrix);
    case Direction.Down: return transpose(matrix.reverse());
  }
}

const turnBack = (matrix: number[][], direction: Direction): number[][] => {
  switch(direction) {
    case Direction.Left: return matrix;
    case Direction.Right: return matrix.map(_ => _.reverse());
    case Direction.Up: return transpose(matrix);
    case Direction.Down: return transpose(matrix).reverse();
  }
}

const moveValues = (map: number[][], direction: Direction): number[][] => {
  map = turnTo(map, direction);
  map = map.map(row => {
    let newRow: number[] = [];
    let lastNum: number | null = null;
    for(const num of row) {
      if (num === 0){
        continue;
      }
      if (num === lastNum) {
        newRow.pop();
        newRow.push(num * 2);
        lastNum = null;
      } else {
        newRow.push(num);
        lastNum = num;
      }
    }
    return [...newRow, ...(new Array(BlockSize - newRow.length).fill(0))];
  });
  return turnBack(map, direction);
};

function App() {
  const [map, setMap] = useState(initMap());

  const hasMapFreeCell = () => {
    return map.some(row => row.includes(0));
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      let direction;
      switch (e.key){
        case "ArrowUp": direction = Direction.Up; break;
        case "ArrowDown": direction = Direction.Down; break;
        case "ArrowLeft": direction = Direction.Left; break;
        case "ArrowRight": direction = Direction.Right; break;
        default: return;
      }
      if (hasMapFreeCell()) {
        let newMap = [...map];
        console.log(newMap);
        newMap = moveValues(newMap, direction);
        console.log('moveValues', newMap);
        addValue(newMap);
        console.log('addValue', newMap);
        setMap(newMap);
      } else {
        console.log("end");
      }
    };
    document.addEventListener("keydown", onKeyDown, false);
    return () => document.removeEventListener("keydown", onKeyDown, false); 
  });

  return (
    <div className="App">
      <Map matrix={map.map(row => row.map(cell => <Block value={cell}/>))}/>
    </div>
  );
}

export default App;
