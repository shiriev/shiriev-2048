import React, { ReactNode } from 'react';
import './Modal.css'

export default function Modal(props: {
    title: string;
    children: ReactNode;
}) {
    return <div className='modal'>
        <div className='modal__content'>
            <h1 className='modal__title'>{props.title}</h1>
            {props.children}
        </div>
    </div>
}
