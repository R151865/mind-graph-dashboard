import React from "react";
import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/cookies";

interface ModalProps {
  setOpen: (open: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ setOpen }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.logoutmodal}>
      <div className={styles.logoutContent}>
        <p className={styles.logoutText}>Are you sure you want to logout?</p>
        <button
          className={styles.logout}
          onClick={() => {
            removeToken();
            navigate("/login");
          }}
        >
          Logout
        </button>
        <button className={styles.cancel} onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
