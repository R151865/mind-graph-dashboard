import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import UserLog from './UserLog';
import * as cookies from '../../utils/cookies';

const mockGetToken = jest.spyOn(cookies, 'getToken');
const mockRemoveToken = jest.spyOn(cookies, 'removeToken');

describe('UserLog Component', () => {
  beforeEach(() => {
    mockGetToken.mockClear();
    mockRemoveToken.mockClear();
  });

  test('renders loading state correctly', () => {
    render(<UserLog />, { wrapper: MemoryRouter });

    expect(screen.getByText(/fetching User ..$/)).toBeInTheDocument();
  });

  test('handles error state and allows re-login', async () => {
    mockGetToken.mockReturnValue('mocked_token');
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({}),
    } as Response);

    render(<UserLog />, { wrapper: MemoryRouter });

    expect(await screen.findByText(/Login again$/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Login again$/));

    expect(mockRemoveToken).toHaveBeenCalled();
    // Optionally check if navigation occurred, but it might require additional setup
  });

  test('renders user data correctly and shows modal on icon click', async () => {
    mockGetToken.mockReturnValue('mocked_token');
    const mockUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      image: 'http://example.com/image.jpg',
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockUser,
    } as Response);

    render(<UserLog />, { wrapper: MemoryRouter });

    // Wait for user data to be displayed
    await waitFor(() => {
      expect(screen.getByAltText(/user$/)).toHaveAttribute('src', mockUser.image);
      expect(screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`)).toBeInTheDocument();
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    });

    // Check if the modal opens when the icon is clicked
    fireEvent.click(screen.getByRole('img'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
