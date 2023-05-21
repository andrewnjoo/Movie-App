import { render } from '@testing-library/react';
import React from 'react';

import { PeoplePage } from '../PeoplePage';

describe('PeoplePage', () => {
  it('renders without crashing', () => {
    render(<PeoplePage />);
  });
});
