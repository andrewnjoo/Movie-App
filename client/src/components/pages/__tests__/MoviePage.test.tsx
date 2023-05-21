import { render } from '@testing-library/react';
import React from 'react';

import { MoviePage } from '../MoviePage';

describe('MoviePage', () => {
  it('renders without crashing', () => {
    render(<MoviePage />);
  });
});
