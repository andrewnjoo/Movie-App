import { render } from '@testing-library/react';
import React from 'react';

import { LoginPage } from '../LoginPage';

describe('LoginPage', () => {
  it('renders without crashing', () => {
    render(<LoginPage />);
  });
});
