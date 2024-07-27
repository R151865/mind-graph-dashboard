import React from "react";
import styles from "./NotFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Oops!</h1>
      <p className={styles.para}>404 - Page Not Found!</p>
    </div>
  );
};

export default NotFound;
