import React from 'react';

import { renderWithProviders } from '@/utils';
import { SearchPage } from '../SearchPage';

describe('SearchPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<SearchPage />);
  });
});
