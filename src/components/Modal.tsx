import React, { ReactNode } from 'react';
import './Modal.css'

export interface ModalProps {
    title: string;
    children: ReactNode;
}

function Modal(props: ModalProps) {
    return <div className='modal'>
        <div className='modal__content'>
            <h1 className='modal__title'>{props.title}</h1>
            {props.children}
        </div>
    </div>;
}

export default Modal;