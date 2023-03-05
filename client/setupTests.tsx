import React from 'react';
import { expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

import { Provider } from 'react-redux';
import store from './src/redux/store';

const customRender = (ui: React.ReactElement): any => {
  return render(<Provider store={store}>{ui}</Provider>);
};

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

export { customRender };
