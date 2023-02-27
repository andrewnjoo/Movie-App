/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import TrailerModal from './TrailerModal';

test('should render youtube link in modal', () => {
  render(<TrailerModal open setOpen={() => {}} trailer="Go8nTmfrQd8" />);
  const iframe = document.querySelector('iframe');
  expect(iframe?.src).toBe('https://www.youtube.com/embed/Go8nTmfrQd8');
});
