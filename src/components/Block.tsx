import * as React from 'react';
import './Block.css';
import Cell from '../utils/Cell';

export interface BlockProps {
    cell: Cell;
};


function Block(props: BlockProps) {
    const { value, position } = props.cell;
    const style = {
        marginLeft: position.x * 100,
        marginTop: position.y * 100,
    };
    return <div style={style} className={`block block_value_${value}`}>
        <span className={`block__text block__text_digits-count_${value.toString().length}`}>
            {value || null}
        </span>
    </div>;
};

export default Block;