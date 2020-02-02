import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Map from './components/Map';
import Counter from './components/Counter';
import Direction from './utils/Direction'
import Logic from './utils/Logic/Logic';
import LogicRandomize from './utils/LogicRandomize/LogicRandomize';
import Action from './utils/Actions/Action';
import { useKeyboardArrows } from './utils/hooks';

/*todo create config file*/
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
        <div className='app'>
            <Map mapSize={logicRef.current.mapSize} currentActions={currentActions}/>
            <Counter title={'Очки'} value={logicRef.current.score}/>
            <Counter title={'Количество ходов'} value={logicRef.current.stepCount}/>
            <Counter title={'Конец игры'} value={logicRef.current.isEnd ? 1 : 0}/>
        </div>
    );
}

export default App;