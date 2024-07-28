// CardsList.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import CardsList from './CardsList';
import '@testing-library/jest-dom/extend-expect';

// Mock the Caption and DirectionCard components
jest.mock('../Reusable/Caption/Caption', () => ({ text }: { text: string }) => (
  <div>{text}</div>
));

jest.mock('../Reusable/DirectionCard/DirectionCard', () => ({ link }: { link: string }) => (
  <a href={link}>Direction Card</a>
));

describe('CardsList', () => {
  test('renders without crashing', () => {
    render(<CardsList />);
    // The component renders without crashing if no errors are thrown
  });

  test('renders Caption component with correct text', () => {
    render(<CardsList />);
    const captionElement = screen.getByText('Dashboard');
    expect(captionElement).toBeInTheDocument();
  });

  test('renders DirectionCard component with correct link', () => {
    render(<CardsList />);
    const directionCardElement = screen.getByText('Direction Card');
    expect(directionCardElement).toBeInTheDocument();
    expect(directionCardElement.closest('a')).toHaveAttribute('href', '/users');
  });
});
