import React from "react";
import styles from "./Button.module.css";

interface ButtonPros {
  text: String;
  loading: Boolean;
}

const Button: React.FC<ButtonPros> = ({ text, loading = false }) => {
  return (
    <button type="submit" className={`${styles.button}`}>
      {loading ? "Please wait ..." : text}
    </button>
  );
};
export default Button;
