import React from "react";

import styles from "./Username.module.css";
interface UsernameProps {
  labelText?: string;
  type?: string;
  placeholder?: string;
  id?: string;
  errorMessage?: string;
  value?: string;
  onChange: any;
}

const Username: React.FC<UsernameProps> = ({
  labelText = "",
  type = "",
  placeholder = "",
  id = "",
  errorMessage = "",
  value = "",
  onChange = "",
  ...params
}) => {
  return (
    <div className={`${styles.inputContainer}`}>
      <label htmlFor={id} className={`${styles.label}`}>
        {labelText}
      </label>
      <input
        id={id}
        className={`${styles.input}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...params}
      />
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};

export default Username;
