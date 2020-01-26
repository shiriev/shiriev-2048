import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Block from './components/Block';
import Map from './components/Map';
import Direction from './utils/Direction'
import Logic from './utils/Logic/Logic';
import LogicRandomize from './utils/LogicRandomize/LogicRandomize';

const BlockSize = 4;

function App() {
    const logicRef = useRef(new Logic(BlockSize, new LogicRandomize()));
    const [map, setMap] = useState(logicRef.current.matrix);

    useEffect(() => {
        const logic = logicRef.current;
        const onKeyDown = (e: KeyboardEvent) => {
            let direction;
            switch (e.key){
                case "ArrowUp": direction = Direction.Up; break;
                case "ArrowDown": direction = Direction.Down; break;
                case "ArrowLeft": direction = Direction.Left; break;
                case "ArrowRight": direction = Direction.Right; break;
                default: return;
            }

            const actions = logic.move(direction);
            console.log(actions);
            console.log(logic.score);
            setMap(logic.matrix);
        };
        logic.addCell();
        logic.addCell();
        setMap(logic.matrix);
        document.addEventListener("keydown", onKeyDown, false);
        return () => document.removeEventListener("keydown", onKeyDown, false); 
    }, []);

    return (
        <div className="app">
            <Map>{map.map(row => row.map(cell => <Block value={cell}/>))}</Map>
        </div>
    );
}

export default App;