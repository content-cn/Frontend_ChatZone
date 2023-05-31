import React, { useContext, useEffect, useRef } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import ChatContext from "../../context/ChatContext/ChatContext";
import styles from "./Message.module.css";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const date = new Date(message.date.seconds * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`${styles.message} ${
        message.senderId === currentUser.uid && styles.owner
      }`}
    >
      <div className={styles.messageInfo}>
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{`${hours}:${minutes}`}</span>
      </div>
      <div className={styles.messageContent}>
        {message.text && <p>{message?.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
