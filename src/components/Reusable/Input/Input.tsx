import React from "react";
import styles from "./input.module.css";

interface InputProps  {
  labelText?: string;
  type?: string;
  placeholder?: string;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  labelText = "",
  type = "text",
  placeholder = "",
  id = "",
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
        placeholder={placeholder}
        {...params}
      />
    </div>
  );
};

export default Input;
