import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./SideBar.module.css";

import {
  MenuIcon,
  PersonOutlineIcon,
  GridViewIcon,
} from "../../assets/icons/icons";

import DashCard from "../Reusable/DashCard/DashCard";


interface SideBarProps{
  closeSideBar?:()=>void

}

const SideBar: React.FC<SideBarProps> = ({closeSideBar=()=>{}}) => {
  const location = useLocation();
  const currentPath: string = location.pathname;

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <MenuIcon sx={{ color: "white" }} />
      </div>

      <div className={styles.cadsContainer}>
        <DashCard
          isActive={currentPath === "/dashboard"}
          link="/dashboard"
          closeSideBar={closeSideBar}
          icon={
            <GridViewIcon
              sx={{
                height: "25px",
                width: "25px",
                color: "white",
              }}
            />
          }
          text="Dashboard"
        />
        <DashCard
          isActive={currentPath === "/users"}
          link="/users"
          closeSideBar={closeSideBar}
          icon={
            <PersonOutlineIcon
              sx={{
                height: "25px",
                width: "25px",
                color: "white",
              }}
            />
          }
          text="Users"
        />
      </div>
    </div>
  );
};

export default SideBar;
