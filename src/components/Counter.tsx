import React from 'react';
import './Counter.css';

export default function Counter(props: {
    title: string
    value: number
}) {
    const { title, value } = props;
    return <div className={'counter'}>
        <div className={'counter__title'}>
            {title}
        </div>
        <div className={'counter__value'}>
            {value}
        </div>
    </div>
}
