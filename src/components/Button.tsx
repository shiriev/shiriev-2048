import React from 'react';
import './Button.css'

export default function Button(props: {
    onClick: () => void
    title: string
}) {
    return <div className='button' onClick={props.onClick}>{props.title}</div>
}
