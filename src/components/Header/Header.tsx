import React from "react";
import styles from "./Header.module.css";

import { NotificationsNoneIcon, MenuIcon } from "../../assets/icons/icons";

import UserLog from "../UserLog/UserLog";

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar=()=>{} }) => {
  return (
    <div className={`${styles.mainContainer}`}>
      <div className={`${styles.body}`}>
        <div className={styles.menuIcon}>
          <MenuIcon
            onClick={toggleSidebar}
            sx={{ marginRight: "20px", color: "#324ea8", cursor: "pointer" }}
          />
        </div>

        <NotificationsNoneIcon sx={{ marginRight: "20px", color: "#324ea8" }} />

        <UserLog />
      </div>
    </div>
  );
};

export default Header;
