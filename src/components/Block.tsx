import * as React from 'react';
import './Block.css';

export interface BlockProps {
    value: number;
};



function Block(props: BlockProps) {
    const { value } = props;
    return <div className={`block block_value_${value}`}>
        <span className={`block__text block__text_digits-count_${value.toString().length}`}>
            {value || null}
        </span>
    </div>;
};

export default Block;