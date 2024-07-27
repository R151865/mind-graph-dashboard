import React from "react";

import styles from "./UserDataCard.module.css";

interface UserDataCardProps {
  title?: string;
  dataList?: any[];
}

const UserDataCard: React.FC<UserDataCardProps> = ({ title, dataList }) => {
  return (
    <div className={styles.userDataCard}>
      <p className={styles.userDataCardPara}>{title}</p>
      {dataList && (
        <table>
          <tr>
            {dataList.map((each: any, index: number) => (
              <th key={index} className={styles.tableHead}>
                {each[0]}
              </th>
            ))}
          </tr>
          <tr>
            {dataList.map((each, index) => (
              <td key={index} className={styles.tableCell}>
                {each[1]}
              </td>
            ))}
          </tr>
        </table>
      )}
    </div>
  );
};

export default UserDataCard;
