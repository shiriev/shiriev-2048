import React from 'react';
import './Map.css';
import Block from './Block';
import { CellWithId } from '../utils/useCells';

export default function Map(props: {
    cells: CellWithId[];
    mapSize: number;
}){
    const { cells, mapSize } = props;
    return <div className='map' style={{'--map-size': mapSize} as React.CSSProperties}>
        {cells.map(cellWithId => <Block key={cellWithId.id} cell={cellWithId.cell}/>)}
    </div>
}
