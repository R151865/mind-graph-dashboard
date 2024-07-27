import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserDataCard from './UserDataCard';
import { act } from 'react-dom/test-utils';

// Mock CSS module
jest.mock('./UserDataCard.module.css', () => ({
  userDataCard: 'userDataCard',
  userDataCardPara: 'userDataCardPara',
  tableHead: 'tableHead',
  tableCell: 'tableCell',
}));

describe('UserDataCard Component', () => {

  test('renders with title and dataList', () => {
    const title = 'User Information';
    const dataList = [
      ['Name', 'John Doe'],
      ['Email', 'john.doe@example.com'],
    ];

    render(<UserDataCard title={title} dataList={dataList} />);

    // Check for title
    expect(screen.getByText(title)).toBeInTheDocument();

    // Check for table headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();

    // Check for table data
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  test('renders without title', () => {
    const dataList = [
      ['Name', 'John Doe'],
      ['Email', 'john.doe@example.com'],
    ];

    render(<UserDataCard dataList={dataList} />);

    // Title should not be in the document
    expect(screen.queryByText('User Information')).not.toBeInTheDocument();

    // Check for table headers and data
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  test('renders without dataList', () => {
    render(<UserDataCard title="User Information" />);

    // Title should be in the document
    expect(screen.getByText('User Information')).toBeInTheDocument();

    // Table should not be present
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  test('renders with empty dataList', () => {
    render(<UserDataCard title="User Information" dataList={[]} />);

    // Title should be in the document
    expect(screen.getByText('User Information')).toBeInTheDocument();

    // Table should be present but empty
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(table.querySelectorAll('th')).toHaveLength(0);
    expect(table.querySelectorAll('td')).toHaveLength(0);
  });

});
