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

    const logic = logicRef.current;
    
    return (
        <div className='app'>
            <div className='app__map'>
                <Map mapSize={logic.mapSize} currentActions={currentActions}/>
            </div>
            <div className='app__title'>
                <h1><a href='https://github.com/shiriev/shiriev-2048/'>2048</a></h1>
            </div>
            <div className='app__score'>
                <Counter title={'очки'} value={logic.score}/>
            </div>
            <div className='app__step-count'>
                <Counter title={'ходы'} value={logic.stepCount}/>
            </div>
        </div>
    );
}

export default App;