import React from "react";

import styles from "./DirectionCard.module.css";
import { Link } from "react-router-dom";

interface DirectionCardProps {
  link?: string;
}

const DirectionCard: React.FC<DirectionCardProps> = ({
  link = "",
}) => {
  return (
    <Link to={link} style={{ textDecoration: "none", color: "black" }}>
      <div className={`${styles.contentBox}`}>
        <div className={styles.card}>
          <h1 className={styles.heading}>Go to Users</h1>
        </div>
      </div>
    </Link>
  );
};

export default DirectionCard;
