import React from 'react';
import './Counter.css';

export interface CounterProps {
    title: String;
    value: Number;
};


function Counter(props: CounterProps) {
    const { title, value } = props;
    return <div className={'counter'}>
        <span className={'counter__title'}>
            {title}
        </span>
        <span className={'counter__value'}>
            {value}
        </span>
    </div>;
};

export default Counter;