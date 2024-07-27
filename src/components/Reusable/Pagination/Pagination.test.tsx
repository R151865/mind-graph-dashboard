import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pagination from './Pagination';

describe('<Pagination />', () => {
  const mockHandlePageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders pagination buttons and shows page numbers', () => {
    render(
      <Pagination
        currentPage={2}
        handlePageChange={mockHandlePageChange}
        pageNumbers={[1, 2, 3, 4]}
        totalPages={4}
      />
    );

    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).not.toBeDisabled();


    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toBeDisabled();

    // Check if page numbers are rendered
    [1, 2, 3, 4].forEach(number => {
      expect(screen.getByText(number)).toBeInTheDocument();
    });

    // Check if the current page button is highlighted
    expect(screen.getByText('2')).toHaveClass('selectedButton');
  });

  test('disables Previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        handlePageChange={mockHandlePageChange}
        pageNumbers={[1, 2, 3, 4]}
        totalPages={4}
      />
    );

    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  test('disables Next button on last page', () => {
    render(
      <Pagination
        currentPage={4}
        handlePageChange={mockHandlePageChange}
        pageNumbers={[1, 2, 3, 4]}
        totalPages={4}
      />
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('calls handlePageChange with correct argument on page number click', () => {
    render(
      <Pagination
        currentPage={2}
        handlePageChange={mockHandlePageChange}
        pageNumbers={[1, 2, 3, 4]}
        totalPages={4}
      />
    );

    fireEvent.click(screen.getByText('1'));
    expect(mockHandlePageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('3'));
    expect(mockHandlePageChange).toHaveBeenCalledWith(3);
  });

  test('calls handlePageChange with correct argument on Previous button click', () => {
    render(
      <Pagination
        currentPage={2}
        handlePageChange={mockHandlePageChange}
        pageNumbers={[1, 2, 3, 4]}
        totalPages={4}
      />
    );

    fireEvent.click(screen.getByText('Previous'));
    expect(mockHandlePageChange).toHaveBeenCalledWith(1);
  });

  test('calls handlePageChange with correct argument on Next button click', () => {
    render(
      <Pagination
        currentPage={2}
        handlePageChange={mockHandlePageChange}
        pageNumbers={[1, 2, 3, 4]}
        totalPages={4}
      />
    );

    fireEvent.click(screen.getByText('Next'));
    expect(mockHandlePageChange).toHaveBeenCalledWith(3);
  });
});
