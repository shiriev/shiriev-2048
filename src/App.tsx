import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import Map from './components/Map';
import Counter from './components/Counter';
import Modal from './components/Modal';
import Button from './components/Button';
import Direction from './models/Direction'
import Logic from './models/Logic/Logic';
import LogicRandomize from './models/LogicRandomize/LogicRandomize';
import {Action} from './models/Actions';
import { useKeyboardArrows, useRefresh } from './utils/hooks';

/*todo create config file*/
const MapSize = 4;
const InitialDigitsCount = 2;

function App() {
    const [logic, setLogic] = useState<Logic | null>(null);
    const [isRefresh, refresh] = useRefresh();
    const [currentActions, setCurrentActions] = useState<Action[]>([]);

    const restart = useCallback(() => {
        const newLogic = new Logic(MapSize, new LogicRandomize());
        const actions: Action[] = [];
        for (let i = 0; i < InitialDigitsCount; i++) {
            const action = newLogic.addCell();
            actions.push(...action);
        }
        setLogic(newLogic);
        setCurrentActions(actions);
        refresh();
    }, [refresh]);

    useEffect(() => {
        restart();
    }, [restart]);

    useKeyboardArrows((direction: Direction) => {
        if (logic === null) return;
        const actions = logic.move(direction);
        setCurrentActions(actions);
    });
    
    return (logic &&
        <div className='app'>
            <div className='app__map'>
                {isRefresh && <Map mapSize={logic.mapSize} currentActions={currentActions}/>}
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
            {
                logic.isEnd && 
                <Modal title='Игра окончена'>
                        <p>Хотите сыграть ещё?</p>
                        <Button title='рестарт' onClick={restart}/>
                </Modal>
            }
        </div>
    );
}

export default App;