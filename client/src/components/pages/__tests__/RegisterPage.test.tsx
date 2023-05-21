import { render } from '@testing-library/react';
import React from 'react';

import { RegisterPage } from '../RegisterPage';

describe('RegisterPage', () => {
  it('renders without crashing', () => {
    render(<RegisterPage />);
  });
});
