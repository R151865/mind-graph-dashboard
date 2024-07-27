import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Input from './Input';

describe('<Input />', () => {
  test('renders correctly', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders with correct label text', () => {
    render(<Input labelText="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  test('renders with correct placeholder text', () => {
    render(<Input placeholder="Enter your username" />);
    expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
  });


  test('renders with correct id attribute', () => {
    render(<Input id="username-input" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'username-input');
  });


  test('applies additional props correctly', () => {
    render(<Input data-testid="custom-input" aria-label="custom" />);
    const inputElement = screen.getByTestId('custom-input');
    expect(inputElement).toHaveAttribute('aria-label', 'custom');
  });
});
