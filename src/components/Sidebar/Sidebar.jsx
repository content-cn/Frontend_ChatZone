import React from "react";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Chats from "../Chats/Chats";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
