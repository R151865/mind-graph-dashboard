import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import DirectionCard from './DirectionCard';

describe('<DirectionCard />', () => {
  test('rendering without crash', () => {
    render(
      <MemoryRouter>
        <DirectionCard link="/users" />
      </MemoryRouter>
    );
    expect(screen.getByText('Go to Users')).toBeInTheDocument();
  });

  test('renders with the correct link', () => {
    render(
      <MemoryRouter>
        <DirectionCard link="/users" />
      </MemoryRouter>
    );
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/users');
  });

  test('renders with default link if no link', () => {
    render(
      <MemoryRouter>
        <DirectionCard />
      </MemoryRouter>
    );
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/');
  });

  test('has correct styles applied', () => {
    render(
      <MemoryRouter>
        <DirectionCard link="/users" />
      </MemoryRouter>
    );
    const headingElement = screen.getByText('Go to Users');
    expect(headingElement).toHaveClass('heading');
  });
});
