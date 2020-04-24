import React, { ReactNode } from 'react';
import './Toolbar.css';

export function Tool (props: {
    children: ReactNode,
}) {
    const { children } = props;

    return <div className='tool'>{children}</div>
}

export default function Toolbar(props: {
    children: ReactNode,
}) {
    const { children } = props;

    return <div className='toolbar'>{children}</div>
}
