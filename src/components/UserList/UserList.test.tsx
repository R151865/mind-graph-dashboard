// UserList.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import UserList from './UserList';
import '@testing-library/jest-dom/extend-expect';

// Mock Table and Caption components
jest.mock('../Reusable/Table/Table', () => () => <div>Table Component</div>);
jest.mock('../Reusable/Caption/Caption', () => ({ text }: any) => <div>{text}</div>);

describe('UserList', () => {
  test('renders Caption with correct text', () => {
    render(<UserList />);

    const captionElement = screen.getByText('Users');
    expect(captionElement).toBeInTheDocument();
  });

  test('renders Table component', () => {
    render(<UserList />);

    const tableElement = screen.getByText('Table Component');
    expect(tableElement).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    render(<UserList />);
    // Component renders without crashing if no errors are thrown
  });
});
