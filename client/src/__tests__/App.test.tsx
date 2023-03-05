import React from 'react';
import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { customRender } from '../../setupTests';
import App from '../App';

describe('App component', () => {
  test('renders "Movie App" text', () => {
    customRender(<App />);

    expect(screen.getByText(/Movie App/i)).toBeInTheDocument();
  });
});
