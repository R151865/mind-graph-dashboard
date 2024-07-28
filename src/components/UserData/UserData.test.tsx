// UserData.test.tsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserData from './UserData';

// Mock fetch and environment variable
global.fetch = jest.fn();
process.env.REACT_APP_BASE_API_URL = 'http://mockapi.com/';

describe('UserData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

    render(
      <MemoryRouter initialEntries={['/users/1']}>
        <Routes>
          <Route path="/users/:id" element={<UserData />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading .....')).toBeInTheDocument();
  });

  test('renders error state', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'));

    render(
      <MemoryRouter initialEntries={['/users/1']}>
        <Routes>
          <Route path="/users/:id" element={<UserData />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  test('renders user data', async () => {
    const mockUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      gender: 'Male',
      age: 30,
      phone: '123-456-7890',
      birthDate: '1994-01-01',
      address: {
        address: '123 Main St',
        city: 'Anytown',
        stateCode: 'CA',
        postalCode: '12345',
        country: 'USA',
      },
      company: {
        name: 'Example Corp',
        title: 'Software Engineer',
        department: 'Engineering',
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockUser) });

    render(
      <MemoryRouter initialEntries={['/users/1']}>
        <Routes>
          <Route path="/users/:id" element={<UserData />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Go to users')).toBeInTheDocument();
      expect(screen.getByText('Basic Details')).toBeInTheDocument();
      expect(screen.getByText('Address Details')).toBeInTheDocument();
      expect(screen.getByText('Company Details')).toBeInTheDocument();
    });
  });

  test('navigates to /users when back button is clicked', async () => {
    const mockUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      gender: 'Male',
      age: 30,
      phone: '123-456-7890',
      birthDate: '1994-01-01',
      address: {
        address: '123 Main St',
        city: 'Anytown',
        stateCode: 'CA',
        postalCode: '12345',
        country: 'USA',
      },
      company: {
        name: 'Example Corp',
        title: 'Software Engineer',
        department: 'Engineering',
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockUser) });

    render(
      <MemoryRouter initialEntries={['/users/1']}>
        <Routes>
          <Route path="/users/:id" element={<UserData />} />
          <Route path="/users" element={<div>Users Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('Go to users'));
      expect(screen.getByText('Users Page')).toBeInTheDocument();
    });
  });

  test('renders no user data found when user is null', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(null) });

    render(
      <MemoryRouter initialEntries={['/users/1']}>
        <Routes>
          <Route path="/users/:id" element={<UserData />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No user data found')).toBeInTheDocument();
    });
  });
});
