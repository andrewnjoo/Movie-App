/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import '@testing-library/jest-dom';

test('should render footer component', () => {
  render(<Footer />);
  const footer = screen.getByTestId('footer');
  expect(footer).toBeInTheDocument;
  expect(footer).toHaveTextContent('adnjoo');
});
