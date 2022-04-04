/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../Profile';

test('should render profile component', () => {
  render(<Profile />);
  const profile = screen.getByTestId('profile');
  expect(profile).toBeInTheDocument;
  expect(profile).toHaveTextContent('Welcome');
  expect(profile).toHaveTextContent('Dashboard');
});
