import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from './App';

// Mock axios
jest.mock('axios');

describe('App Component', () => {
  beforeEach(() => {
    // Clear mock before each test
    jest.clearAllMocks();
  });

  test('renders initial search interface', () => {
    render(<App />);
    
    expect(screen.getByRole('heading', { name: /search tickers/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter search term/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  test('handles successful search', async () => {
    const mockData = [
      { symbol: 'AAPL', name: 'Apple Inc.' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.' }
    ];
    
    axios.get.mockResolvedValueOnce({ data: mockData });
    
    render(<App />);
    
    // Type in search term
    const input = screen.getByPlaceholderText(/enter search term/i);
    await userEvent.type(input, 'tech');
    
    // Click search button
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);
    
    // Check loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Wait for results
    await waitFor(() => {
      expect(screen.getByText(/AAPL/)).toBeInTheDocument();
      expect(screen.getByText(/Apple Inc./)).toBeInTheDocument();
      expect(screen.getByText(/GOOGL/)).toBeInTheDocument();
      expect(screen.getByText(/Alphabet Inc./)).toBeInTheDocument();
    });
    
    // Verify API call
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/v1/search', {
      params: { args: 'tech' }
    });
  });

  test('handles error state', async () => {
    // Mock API error
    axios.get.mockRejectedValueOnce(new Error('API Error'));
    
    render(<App />);
    
    // Perform search
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/an error occurred while fetching data/i)).toBeInTheDocument();
    });
  });

  test('handles empty results', async () => {
    // Mock empty response
    axios.get.mockResolvedValueOnce({ data: [] });
    
    render(<App />);
    
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });
  });

  test('updates search term on input change', () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText(/enter search term/i);
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(input.value).toBe('test');
  });
});