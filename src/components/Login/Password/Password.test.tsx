// Password.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Password from './Password';
import '@testing-library/jest-dom/extend-expect';

describe('Password', () => {
  test('renders with a label', () => {
    render(<Password labelText="Password" type="password" onChange={() => {}} />);
    const labelElement = screen.getByText('Password');
    expect(labelElement).toBeInTheDocument();
  });

  test('renders with a placeholder', () => {
    render(<Password placeholder="Enter your password" type="password" onChange={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Enter your password');
    expect(inputElement).toBeInTheDocument();
  });

  test('renders with an error message', () => {
    render(<Password errorMessage="Password is required" type="password" onChange={() => {}} />);
    const errorElement = screen.getByText('Password is required');
    expect(errorElement).toBeInTheDocument();
  });

  test('updates value on change', () => {
    const handleChange = jest.fn();
    render(<Password type="password" value="password123" onChange={handleChange} />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'newpassword' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  test('renders without crashing', () => {
    render(<Password type="password" onChange={() => {}} />);
    // Component renders without crashing if no errors are thrown
  });
});
