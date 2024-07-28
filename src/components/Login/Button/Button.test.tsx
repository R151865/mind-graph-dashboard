// Button.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';
import '@testing-library/jest-dom/extend-expect';

describe('Button', () => {
  test('renders with text', () => {
    render(<Button text="Click Me" loading={false} />);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders with loading text', () => {
    render(<Button text="Click Me" loading={true} />);
    const buttonElement = screen.getByText('Please wait ...');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders with default text when not loading', () => {
    render(<Button text="Submit" loading={false} />);
    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    render(<Button text="Click Me" loading={false} />);
    // Component renders without crashing if no errors are thrown
  });
});
