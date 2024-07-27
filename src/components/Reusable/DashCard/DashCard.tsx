import React, { useEffect } from "react";

import styles from "./DashCard.module.css";
import { Link } from "react-router-dom";

interface DashCardProps {
  link?: string;
  text?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  closeSideBar?:()=>void;
}

const DashCard: React.FC<DashCardProps> = ({
  link = "",
  text = "",
  icon = "",
  isActive = false,
  closeSideBar=()=>{}
}) => {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <div
      style={{
        background:isActive ? "#e3563d": "none"
      }}

      onClick={closeSideBar}
      className={`${styles.dashCard} ${styles.active} ${isActive ? styles.active: ""}`}>
        {icon}
        <p className={styles.dashCardText}>{text}</p>
      </div>
    </Link>
  );
};

export default DashCard;
