import React from 'react';
import './Button.css'

export interface ButtonProps {
    onClick: () => void;
    title: string;
}

function Button(props: ButtonProps) {
    return <div className='button' onClick={props.onClick}>{props.title}</div>;
}

export default Button;