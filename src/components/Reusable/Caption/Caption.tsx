import React from "react";
import styles from "./Caption.module.css";

interface CaptionProps {
  text: string;
}

const Caption: React.FC<CaptionProps> = ({ text }) => {
  return <h1 className={styles.head}>{text}</h1>;
};

export default Caption;
