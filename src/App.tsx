import React, { useEffect, useState } from 'react';
import './App.css';
import Map, { useMapAnimation } from './components/Map';
import Counter from './components/Counter';
import Modal from './components/Modal';
import Button from './components/Button';
import Direction from './models/Direction'
import Logic from './models/Logic/Logic';
import LogicRandomize from './models/LogicRandomize/LogicRandomize';
import { Action } from './models/Actions';
import { useKeyboardArrows } from './utils/hooks';

/*todo create config file*/
const MapSize = 4;
const InitialDigitsCount = 2;

export default function App() {
    const [logic, setLogic] = useState<Logic | null>(null);

    const {mapAnimationParams, sendActions} = useMapAnimation();

    useEffect(() => {
        const newLogic = new Logic(MapSize, new LogicRandomize());
        const actions: Action[] = [];
        for (let i = 0; i < InitialDigitsCount; i++) {
            const action = newLogic.addCell();
            actions.push(...action);
        }
        setLogic(newLogic);
        sendActions(actions);
    }, [sendActions]);

    const restart = () => {
        if (logic === null) return;
        const actions = logic.restart();
        for (let i = 0; i < InitialDigitsCount; i++) {
            const action = logic.addCell();
            actions.push(...action);
        }
        sendActions(actions);
    };

    useKeyboardArrows((direction: Direction) => {
        if (logic === null) return;
        const actions = logic.move(direction);
        sendActions(actions);
    });
    
    return (logic &&
        <div className='app'>
            <div className='app__map'>
                <Map mapSize={logic.mapSize} mapAnimationParams={mapAnimationParams}/>
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
