import { render } from '@testing-library/react';
import React from 'react';

import { PersonPage } from '../PersonPage';

describe.skip('PersonPage', () => {
  it('renders without crashing', () => {
    render(<PersonPage />);
  });
});
