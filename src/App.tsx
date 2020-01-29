import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Map from './components/Map';
import Direction from './utils/Direction'
import Logic from './utils/Logic/Logic';
import LogicRandomize from './utils/LogicRandomize/LogicRandomize';
import Action from './utils/Actions/Action';
import { useKeyboardArrows } from './utils/hooks';

const MapSize = 4;
const InitialDigitsCount = 2;

function App() {
    const logicRef = useRef(new Logic(MapSize, new LogicRandomize()));
    const [currentActions, setCurrentActions] = useState<Action[]>([]);

    useEffect(() => {
        const logic = logicRef.current;
        const actions: Action[] = [];
        for (let i = 0; i < InitialDigitsCount; i++) {
            const action = logic.addCell();
            actions.push(...action);
        }
        setCurrentActions(actions);
    }, []);

    useKeyboardArrows((direction: Direction) => {
        const logic = logicRef.current;
        const actions = logic.move(direction);
        setCurrentActions(actions);
    });
    
    return (
        <div className="app">
            <Map mapSize={logicRef.current.mapSize} currentActions={currentActions}/>
            <div>{logicRef.current.score}</div>
            <div>{logicRef.current.stepCount}</div>
            <div>{logicRef.current.isEnd ? 1 : 0}</div>
        </div>
    );
}

export default App;