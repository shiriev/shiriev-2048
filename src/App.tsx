import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { useCookies } from "react-cookie";
import Map, { useMapAnimation } from './components/Map';
import Counter from './components/Counter';
import Modal from './components/Modal';
import Button from './components/Button';
import Title from './components/Title';
import Toolbar, { Tool } from './components/Toolbar';
import Direction from './models/Direction';
import Logic from './models/Logic/Logic';
import LogicRandomize from './models/LogicRandomize/LogicRandomize';
import { Action } from './models/Actions';
import LogicState from './models/Logic/LogicState';
import Cell from './models/Cell';
import Point from './models/Point';
import { useMovementControl, useClosingControl } from './utils/hooks';
import localeStrings, { language } from './utils/localeStrings';

/*todo create config file*/
const MapDimension = 4;
const InitialDigitsCount = 2;

type AppCookie = {
    language: language,
    logicState: LogicState
}

const useAppCookies = (): [
    AppCookie | null,
    (value: AppCookie) => void
] => {
    const CookieName = 'AppCookie';
    const [cookies, setCookie] = useCookies(['AppCookie']);

    const appCookie: AppCookie | null = cookies[CookieName] || null;
    if (appCookie) {
        appCookie.logicState.cells = appCookie.logicState.cells.map((cell: any) => 
            new Cell(cell.value, new Point(cell.position.x, cell.position.y)));
    }

    const setAppCookie = (appState: AppCookie): void => setCookie(CookieName, appState);

    return [appCookie, setAppCookie];
}

export default function App() {
    const [appCookie, setAppCookie] = useAppCookies();

    const [logic, setLogic] = useState<Logic | null>(null);
    const mapRef = useRef(null);

    const {mapAnimationParams, sendActions} = useMapAnimation();
    const [localization, setLocalization] = useState<language>('en');
    const strings = localeStrings[localization];

    useEffect(() => {
        setLocalization(appCookie ? appCookie.language : 'en');
        if (appCookie) {
            const newLogic = new Logic(MapDimension, new LogicRandomize());
            const actions = newLogic.load(appCookie.logicState);
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
    }, [sendActions, appCookie]);

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
        logic && setAppCookie({
            language: localization,
            logicState: logic.save(),
        });
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
                <Counter title={strings.score} value={logic.score}/>
            </div>
            <div className='app__step-count'>
                <Counter title={strings.stepCount} value={logic.stepCount}/>
            </div>
            <div className='app__restart-button'>
                <Button title={strings.restart} onClick={restart}/>
            </div>
            <div className='app__language-bar'>
                <Toolbar>
                    <Tool><div className='app__language-link' onClick={() => setLocalization('en')}>en</div></Tool>
                    <Tool><div className='app__language-link' onClick={() => setLocalization('ru')}>ru</div></Tool>
                </Toolbar>
            </div>
            {
                logic.isEnd && 
                    <Modal title={strings.gameOver}>
                        <p>{strings.doYouWantToTryAgain}</p>
                        <Button title={strings.restart} onClick={restart}/>
                    </Modal>
            }
        </div>
    );
}
