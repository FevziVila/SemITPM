import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search interface', () => {
  render(<App />);
  
  const titleElement = screen.getByText(/search tickers/i);
  const searchInput = screen.getByPlaceholderText(/enter search term/i);
  const searchButton = screen.getByText(/search/i);
  const resultsHeading = screen.getByText(/results:/i);
  
  expect(titleElement).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
  expect(resultsHeading).toBeInTheDocument();
});