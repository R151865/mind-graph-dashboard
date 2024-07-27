import React from "react";
import styles from "./UserLog.module.css";

import { KeyboardArrowDownIcon } from "../../assets/icons/icons";

import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";

import { getToken } from "../../utils/cookies";

const UserLog: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] =  useState<boolean>(true)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      const URL = "https://dummyjson.com/user/me";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const response = await fetch(URL, options);
      if (response.ok === true) {
        const data = await response.json();
        setUser(data);
      } else {
        console.log("errorr");
      }
      setLoading(false)
    };

    fetchUser();
  }, []);


  if(loading){
    return <p>fetching User ..</p>
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
