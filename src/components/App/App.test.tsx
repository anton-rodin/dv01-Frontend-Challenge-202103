import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Statistics', () => {
  render(<App />);

  const h1Element = screen.getByText(/statistics/i);
  expect(h1Element).toBeInTheDocument();

  const homeOwnershipSelect = screen.queryByTestId('select-homeOwnership');
  expect(homeOwnershipSelect).toBeInTheDocument();

  const quarerSelect = screen.queryByTestId('select-quarter');
  expect(quarerSelect).toBeInTheDocument();

  const termSelect = screen.queryByTestId('select-term');
  expect(termSelect).toBeInTheDocument();

  const yearSelect = screen.queryByTestId('select-year');
  expect(yearSelect).toBeInTheDocument();
});
