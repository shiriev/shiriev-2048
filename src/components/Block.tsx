import * as React from 'react';
import './Block.css';

export interface BlockProps {
    value: number;
};

function Block(props: BlockProps) {
    const { value } = props;
    return <div className='Block'>
        <span className='BlockText'>{value}</span>
        </div>;
};

export default Block;