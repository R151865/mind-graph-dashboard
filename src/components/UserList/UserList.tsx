import React from "react";
import styles from "./UserList.module.css";

import Table from "../Reusable/Table/Table";
import Caption from "../Reusable/Caption/Caption";
const UserList: React.FC = () => {
  return (
    <div className={styles.container}>
      <Caption text="Users" />
      <div className={styles.contentBox}>
        <Table />
      </div>
    </div>
  );
};

export default UserList;
