import React from "react";
import { useEffect, useState } from "react";
import styles from "./Table.module.css";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";


interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  ssn: string;
  image?: string;
  company: {
    department: string;
  };
}

interface FetchResponse {
  users: User[];
}

const headData: string[] = ["Name", "Email", "Phone", "Age", "SSN", "Department"];
const PAGE_SIZES: number = 10; // Options for items per page

const Table: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(PAGE_SIZES); 

  useEffect(() => {
    const fetchCall = async () => {
      setLoading(true);
      const URL = "http://dummyjson.com/users";

      try {
        const response = await fetch(URL);
        if (response.ok && response.status === 200) {
          const data: FetchResponse = await response.json();
          setUsers(data.users);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCall();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  // Calculate paginated data
  const totalItems: number = users.length;
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const paginatedUsers: User[] = users.slice(startIndex, startIndex + itemsPerPage);

  // Pagination controls
  const handlePageChange = (pageNumber: number): void => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlePageSizeChange = (size: number): void => {
    setItemsPerPage(size);
    setCurrentPage(1); // Reset to the first page when page size changes
  };

  // Generate page numbers
  const pageNumbers: number[] = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHead}>
            {headData.map((header) => (
              <th key={header} className={styles.tableHeadEl}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr 
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/users/${user.id}`)}
              key={user.id} // Use user.id as the key
              className={styles.tableCellContainer}
            >
              <td className={styles.tableCell}>
                <div className={styles.nameContainer}>
                  {user.image ? (
                    <img alt="user" src={user.image} className={styles.user} />
                  ) : (
                    <p className={styles.userStart}>{user.firstName[0]}</p>
                  )}
                  <span className={styles.textCapitalize}>
                    {user.firstName} {user.lastName}
                  </span>
                </div>
              </td>
              <td className={styles.tableCell}>{user.email}</td>
              <td className={styles.tableCell}>{user.phone}</td>
              <td className={styles.tableCell}>{user.age}</td>
              <td className={styles.tableCell}>{user.ssn}</td>
              <td className={styles.tableCell}>{user.company.department}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        pageNumbers={pageNumbers}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Table;
