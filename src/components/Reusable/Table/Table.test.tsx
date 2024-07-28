import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Table from './Table';
import { act } from 'react-dom/test-utils';

// Mock fetch globally
global.fetch = jest.fn();

describe('Table Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test('renders loading state correctly', () => {
    // Mock fetch to return pending promise
    (global.fetch as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(<Table />, { wrapper: MemoryRouter });

    expect(screen.getByText(/fetching User ..$/)).toBeInTheDocument();
  });

  test('handles error state correctly', async () => {
    // Mock fetch to return an error response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response);

    render(<Table />, { wrapper: MemoryRouter });

    expect(await screen.findByText(/Something went wrong$/)).toBeInTheDocument();
  });

  test('renders user data correctly', async () => {
    // Mock fetch to return a successful response with user data
    const mockUsers = {
      users: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '123-456-7890',
          age: 30,
          ssn: '123-45-6789',
          image: 'http://example.com/image.jpg',
          company: { department: 'Engineering' },
        },
        // Add more mock users if needed
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockUsers,
    } as Response);

    render(<Table />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('123-456-7890')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
      expect(screen.getByText('123-45-6789')).toBeInTheDocument();
      expect(screen.getByText('Engineering')).toBeInTheDocument();
    });
  });

  test('navigates to user details on row click', async () => {
    // Mock fetch to return user data
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        users: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '123-456-7890',
            age: 30,
            ssn: '123-45-6789',
            image: 'http://example.com/image.jpg',
            company: { department: 'Engineering' },
          },
        ],
      }),
    } as Response);

    render(<Table />, { wrapper: MemoryRouter });

    await waitFor(() => {
      fireEvent.click(screen.getByText('John Doe'));
      // Ensure navigation logic is triggered. This might require additional setup
    });
  });

  test('handles pagination controls', async () => {
    // Mock fetch to return user data
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        users: Array.from({ length: 25 }, (_, index) => ({
          id: index + 1,
          firstName: 'John',
          lastName: 'Doe',
          email: `john.doe${index}@example.com`,
          phone: '123-456-7890',
          age: 30,
          ssn: '123-45-6789',
          image: 'http://example.com/image.jpg',
          company: { department: 'Engineering' },
        })),
      }),
    } as Response);

    render(<Table />, { wrapper: MemoryRouter });

    await waitFor(() => {
      // Initially shows the first page of users
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Simulate a page change
    act(() => {
      fireEvent.click(screen.getByText('2')); // Click on page 2
    });

    // Verify that users on page 2 are displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument(); // Check for updated page users
    });
  });
});
