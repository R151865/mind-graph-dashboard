import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
  pageNumbers: number[];
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  handlePageChange,
  pageNumbers,
  totalPages,
}) => {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={number === currentPage ? styles.selectedButton : ""}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
