import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import * as cookies from '../../utils/cookies';

// Mock the dependencies
jest.mock('../../utils/cookies', () => ({
  setToken: jest.fn(),
  getToken: jest.fn(),
}));

const mockSetToken = cookies.setToken as jest.MockedFunction<typeof cookies.setToken>;
const mockGetToken = cookies.getToken as jest.MockedFunction<typeof cookies.getToken>;

describe('Login Component', () => {
  beforeEach(() => {
    mockSetToken.mockClear();
    mockGetToken.mockClear();
  });

  test('renders login form correctly', () => {
    render(<Login />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('shows error messages when fields are empty', async () => {
    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText(/login/i));
    
    expect(await screen.findByText('*Please enter username')).toBeInTheDocument();
    expect(await screen.findByText('*Please enter password')).toBeInTheDocument();
  });

  test('shows error messages for invalid input', async () => {
    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'ab' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'ab' } });
    fireEvent.click(screen.getByText(/login/i));

    expect(await screen.findByText('*Username should be at least 3 characters')).toBeInTheDocument();
    expect(await screen.findByText('*Password should be at least 3 characters')).toBeInTheDocument();
  });

  test('handles successful login', async () => {
    mockGetToken.mockReturnValue(undefined); // Simulate no token in cookies
    const mockResponse = { token: 'mocked_token' };

    // Mock the global fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    } as Response);

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'validUsername' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'validPassword' } });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => {
      expect(mockSetToken).toHaveBeenCalledWith('mocked_token');
      expect(screen.queryByText(/login/i)).not.toBeInTheDocument(); // Should redirect
    });
  });

  test('shows error message on failed login', async () => {
    mockGetToken.mockReturnValue(undefined); // Simulate no token in cookies

    // Mock the global fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({}),
    } as Response);

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'validUsername' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'validPassword' } });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => {
      expect(screen.getByText('* Invalid credentials provided')).toBeInTheDocument();
    });
  });

  test('redirects if token exists', () => {
    mockGetToken.mockReturnValue('existing_token'); // Simulate token present in cookies

    const { container } = render(<Login />, { wrapper: MemoryRouter });

    // Check if the component redirects
    expect(container.innerHTML).toBe('');
  });
});
