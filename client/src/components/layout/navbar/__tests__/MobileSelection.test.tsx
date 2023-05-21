import { render } from '@testing-library/react';
import React from 'react';

import { MobileSelection } from '../MobileSelection';
import { hrefs } from '../Navbar';

describe('MobileSelection', () => {
  it('renders without crashing', () => {
    render(<MobileSelection href={hrefs[0]} hrefs={hrefs} />);
  });
});
