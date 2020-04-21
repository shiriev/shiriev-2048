import React, { ReactNode } from 'react';
import './Title.css';

export default function Title(props: {
    children: ReactNode,
    link: string,
}) {
    const {children, link} = props;
    return <h1 className='title'><a href={link}>{children}</a></h1>;
}
