import React from "react";
import styles from "./UserLog.module.css";

import { KeyboardArrowDownIcon } from "../../assets/icons/icons";
import { useNavigate } from "react-router-dom";

import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";

import { getToken, removeToken } from "../../utils/cookies";

const { REACT_APP_BASE_API_URL } = process.env;

const UserLog: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const loginAgain = () => {
    removeToken();
    navigate("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const URL = `${REACT_APP_BASE_API_URL}user/me`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const response = await fetch(URL, options);

      console.log(options, response);
      if (response.ok === true) {
        const data = await response.json();
        setUser(data);
        setError(false);
      } else {
        setError(true);
        loginAgain();

        console.log("errorr");
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>fetching User ..</p>;
  }

  if (error) {
    return <button onClick={loginAgain}>Login again</button>;
  }

  return (
    user && (
      <div className={`${styles.container}`}>
        <img src={user.image} alt="user" className={`${styles.userImg}`} />

        <div className={styles.textContainer}>
          <p className={`${styles.name}`}>
            {user.firstName} {user.lastName}
          </p>
          <p className={`${styles.email}`}>{user.email}</p>
        </div>

        <KeyboardArrowDownIcon
          sx={{
            marginLeft: "20px",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
        />
        {open && <Modal setOpen={setOpen} />}
      </div>
    )
  );
};

export default UserLog;
