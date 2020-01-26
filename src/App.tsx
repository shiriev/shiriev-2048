import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Block from './components/Block';
import Map from './components/Map';
import Direction from './utils/Direction'
import Logic from './utils/Logic/Logic';
import LogicRandomize from './utils/LogicRandomize/LogicRandomize';

const BlockSize = 4;

function App() {
  const logic = useRef(new Logic(BlockSize, new LogicRandomize()));
  const [map, setMap] = useState(logic.current.matrix);

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

      const actions = logic.current.move(direction);
      console.log(actions);
      console.log(logic.current.score);
      setMap(logic.current.matrix);
    };
    logic.current.addCell();
    logic.current.addCell();
    setMap(logic.current.matrix);
    document.addEventListener("keydown", onKeyDown, false);
    return () => document.removeEventListener("keydown", onKeyDown, false); 
  }, []);

  return (
    <div className="App">
      <Map matrix={map.map(row => row.map(cell => <Block value={cell}/>))}/>
    </div>
  );
}

export default App;
