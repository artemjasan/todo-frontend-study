import React from 'react';
import { render, screen } from '@testing-library/react';

test('renders learn react link', () => {
  render(<>Hello World!</>); // TODO: replace with real test
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
