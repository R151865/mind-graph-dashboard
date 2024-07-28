// Username.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Username from './Username';
import '@testing-library/jest-dom/extend-expect';

describe('Username', () => {
  test('renders with a label', () => {
    render(<Username labelText="Username" type="text" onChange={() => {}} />);
    const labelElement = screen.getByText('Username');
    expect(labelElement).toBeInTheDocument();
  });

  test('renders with a placeholder', () => {
    render(<Username placeholder="Enter your username" type="text" onChange={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Enter your username');
    expect(inputElement).toBeInTheDocument();
  });

  test('renders with an error message', () => {
    render(<Username errorMessage="Username is required" type="text" onChange={() => {}} />);
    const errorElement = screen.getByText('Username is required');
    expect(errorElement).toBeInTheDocument();
  });

  test('updates value on change', () => {
    const handleChange = jest.fn();
    render(<Username type="text" value="user123" onChange={handleChange} />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'newuser' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  test('renders without crashing', () => {
    render(<Username type="text" onChange={() => {}} />);
    // Component renders without crashing if no errors are thrown
  });
});
