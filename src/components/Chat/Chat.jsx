import React, { useContext } from "react";
import Add from "../../images/add.png";
import More from "../../images/more.png";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import styles from "./Chat.module.css";
import ChatContext from "../../context/ChatContext/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        <span>{data.user?.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
