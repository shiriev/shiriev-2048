import React from 'react';
import './Counter.css';

export interface CounterProps {
    title: string;
    value: number;
};

function Counter(props: CounterProps) {
    const { title, value } = props;
    return <div className={'counter'}>
        <div className={'counter__title'}>
            {title}
        </div>
        <div className={'counter__value'}>
            {value}
        </div>
    </div>;
};

export default Counter;