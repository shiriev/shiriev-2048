import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    /* todo add usefull tests */ 
    const { getByText } = render(<App />);
    expect(true).toEqual(true);
});
