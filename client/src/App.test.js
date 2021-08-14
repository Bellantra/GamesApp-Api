import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App.js';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('<App /> the application works correctly ', () => {
  render(<App />);
  expect(screen.getByText('Enter to Game')).toBeInTheDocument();
 
  //  expect(screen.getAllByTestId('title_app').textContent).toBe('Video Games App');
});