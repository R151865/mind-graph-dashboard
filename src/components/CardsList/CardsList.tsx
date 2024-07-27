import React from "react";
import styles from "./CardsList.module.css";

import Caption from "../Reusable/Caption/Caption";
import DirectionCard from "../Reusable/DirectionCard/DirectionCard";

const CardsList: React.FC = () => {
  return (
    <div className={styles.container}>
      <Caption text="Dashboard" />
      <div className={styles.contentBox}>
        <DirectionCard link="/users" />
      </div>
    </div>
  );
};

export default CardsList;
