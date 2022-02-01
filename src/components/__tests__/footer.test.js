import { render, screen, cleanup } from '@testing-library/react';
import Footer from '../Footer';
import '@testing-library/jest-dom';

test('should render footer component', () => {
  render(<Footer />);
  const footer = screen.getByTestId('footer');
  expect(footer).toBeInTheDocument;
  expect(footer).toHaveTextContent('adnjoo');
});
