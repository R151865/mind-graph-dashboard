// Modal.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/cookies';
import Modal from './Modal';
import '@testing-library/jest-dom/extend-expect';

// Mock `useNavigate` and `removeToken`
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../utils/cookies', () => ({
  removeToken: jest.fn(),
}));

describe('Modal', () => {
  const setOpen = jest.fn();
  const navigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });

  test('renders with correct text and buttons', () => {
    render(<Modal setOpen={setOpen} />);
    const textElement = screen.getByText('Are you sure you want to logout?');
    const logoutButton = screen.getByText('Logout');
    const cancelButton = screen.getByText('Cancel');

    expect(textElement).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test('clicking logout button calls removeToken and navigates to login', () => {
    render(<Modal setOpen={setOpen} />);
    
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(removeToken).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/login');
  });

  test('clicking cancel button calls setOpen with false', () => {
    render(<Modal setOpen={setOpen} />);
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(setOpen).toHaveBeenCalledWith(false);
  });

  test('renders without crashing', () => {
    render(<Modal setOpen={setOpen} />);
    // Component renders without crashing if no errors are thrown
  });
});
