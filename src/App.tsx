import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { useCookies } from "react-cookie";
import Map, { useMapAnimation } from './components/Map';
import Counter from './components/Counter';
import Modal from './components/Modal';
import Button from './components/Button';
import Title from './components/Title';
import Direction from './models/Direction';
import Logic from './models/Logic/Logic';
import LogicRandomize from './models/LogicRandomize/LogicRandomize';
import { Action } from './models/Actions';
import { useMovementControl, useClosingControl } from './utils/hooks';
import LogicState from './models/Logic/LogicState';
import Cell from './models/Cell';
import Point from './models/Point';

/*todo create config file*/
const MapDimension = 4;
const InitialDigitsCount = 2;

const useLogicStateCookies = () => {
    const CookieName = 'LogicState';
    const [cookies, setCookie] = useCookies([CookieName]);

    const logicStateCookie = cookies[CookieName] || null;
    if (logicStateCookie) {
        logicStateCookie.cells = logicStateCookie.cells.map((cell: any) => 
            new Cell(cell.value, new Point(cell.position.x, cell.position.y)));
    }

    const setLogicStateCookie = (logicState: LogicState): void => setCookie(CookieName, logicState);

    return [logicStateCookie, setLogicStateCookie];
}

export default function App() {
    const [logic, setLogic] = useState<Logic | null>(null);
    const mapRef = useRef(null);

    const {mapAnimationParams, sendActions} = useMapAnimation();
    const [logicStateCookie, setLogicStateCookie] = useLogicStateCookies();

    useEffect(() => {
        if (logicStateCookie) {
            const newLogic = new Logic(MapDimension, new LogicRandomize());
            const actions = newLogic.load(logicStateCookie);
            setLogic(newLogic);
            sendActions(actions);
        } else {
            const newLogic = new Logic(MapDimension, new LogicRandomize());
            const actions: Action[] = [];
            for (let i = 0; i < InitialDigitsCount; i++) {
                const action = newLogic.addCell();
                actions.push(...action);
            }
            setLogic(newLogic);
            sendActions(actions);
        }
    }, [sendActions, logicStateCookie]);

    const restart = () => {
        if (logic === null) return;
        const actions = logic.restart();
        for (let i = 0; i < InitialDigitsCount; i++) {
            const action = logic.addCell();
            actions.push(...action);
        }
        sendActions(actions);
    };

    useMovementControl((direction: Direction) => {
        if (logic === null) return;
        const actions = logic.move(direction);
        sendActions(actions);
    }, mapRef);

    useClosingControl(() => {
        logic && setLogicStateCookie(logic.save());
    });
    
    return (logic &&
        <div className='app'>
            <div ref={mapRef} className='app__map'>
                <Map mapDimension={logic.mapDimension} mapAnimationParams={mapAnimationParams}/>
            </div>
            <div className='app__title'>
                <Title link='https://github.com/shiriev/shiriev-2048/'>2048</Title>
            </div>
            <div className='app__score'>
                <Counter title={'очки'} value={logic.score}/>
            </div>
            <div className='app__step-count'>
                <Counter title={'ходы'} value={logic.stepCount}/>
            </div>
            <div className='app__restart-button'>
                <Button title={'рестарт'} onClick={restart}/>
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
