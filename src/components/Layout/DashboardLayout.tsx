import React, { useState } from "react";
import styles from "./DashboardLayout.module.css";

import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  return (
    <div>
      <div className={styles.headerSec}>
        <Header toggleSidebar={toggleSidebar} />
      </div>

      <div className={styles.container}>
        {isSideBarOpen && (
          <button
            onClick={() => setIsSideBarOpen(false)}
            className={styles.close}
          >
            X
          </button>
        )}

        {isSideBarOpen && (
          <div className={`${styles.leftContainer} ${styles.mobile}`}>
            <SideBar closeSideBar={closeSideBar} />
          </div>
        )}

        <div className={`${styles.leftContainer} ${styles.desktop}`}>
          <SideBar closeSideBar={closeSideBar} />
        </div>

        <div className={styles.rightContainer}>{props.children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
