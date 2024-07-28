import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./UserData.module.css";

import Caption from "../../components/Reusable/Caption/Caption";
import UserDataCard from "../Reusable/UserDataCard/UserDataCard";

interface Address {
  address: string;
  city: string;
  stateCode: string;
  postalCode: string;
  country: string;
}

interface Company {
  name: string;
  title: string;
  department: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  phone: string;
  birthDate: string;
  address: Address;
  company: Company;
}

const { REACT_APP_BASE_API_URL } = process.env;

const UserData = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCall = async () => {
      setLoading(true);
      const URL = `${REACT_APP_BASE_API_URL}users/${id}`;
      const options: RequestInit = {
        method: "GET",
      };

      try {
        const response = await fetch(URL, options);

        if (response.ok) {
          const data: User = await response.json();
          setUser(data);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCall();
  }, [id]);

  if (loading) {
    return <p>Loading .....</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  const getPreparedBasicDetailsList = (userObj: User) => {
    return [
      ["Name", `${userObj.firstName} ${userObj.lastName}`],
      ["Email", userObj.email],
      ["Gender", userObj.gender],
      ["Age", userObj.age.toString()],
      ["Phone", userObj.phone],
      ["Birth Date", userObj.birthDate],
    ];
  };

  const getPreparedAddressDetailsList = (userObj: User) => {
    return [
      ["Address", userObj.address.address],
      ["City", userObj.address.city],
      ["State Code", userObj.address.stateCode],
      ["Postal Code", userObj.address.postalCode],
      ["Country", userObj.address.country],
    ];
  };

  const getPreparedCompanyDetailsList = (userObj: User) => {
    return [
      ["Name", userObj.company.name],
      ["Title", userObj.company.title],
      ["Department", userObj.company.department],
    ];
  };

  if (!user) {
    return <p>No user data found</p>;
  }

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Caption text={`${user.firstName} ${user.lastName}`} />
        <Link to="/users">
          <button className={styles.back}>{`Go to users`}</button>
        </Link>
      </div>

      <div className={styles.contentBox}>
        <UserDataCard
          title="Basic Details"
          dataList={getPreparedBasicDetailsList(user)}
        />
        <UserDataCard
          title="Address Details"
          dataList={getPreparedAddressDetailsList(user)}
        />
        <UserDataCard
          title="Company Details"
          dataList={getPreparedCompanyDetailsList(user)}
        />
      </div>
    </div>
  );
};

export default UserData;
