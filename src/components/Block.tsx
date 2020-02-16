import React from 'react';
import './Block.css';
import Cell from '../models/Cell';

export default function Block(props: {
    cell: Cell
}) {
    const { value, position } = props.cell;
    const style = {
        "--position-x": position.x,
        "--position-y": position.y
    } as React.CSSProperties;
    return <div style={style} className={`block block_value_${value}`}>
        <span className={`block__text block__text_digits-count_${value.toString().length}`}>
            {value || null}
        </span>
    </div>
}
