import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import App from '../App';

describe('App component', () => {
  test('renders "hi" text', () => {
    render(<App />);
    expect(document.querySelector('.App')?.textContent).toBe('hi');
  });
});
