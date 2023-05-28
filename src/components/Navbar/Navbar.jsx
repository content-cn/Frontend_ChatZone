import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import AuthContext from "../../context/AuthContext/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>ChatZone</span>
      <div className={styles.user}>
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
