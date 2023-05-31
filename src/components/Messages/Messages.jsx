import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import ChatContext from "../../context/ChatContext/ChatContext";
import { db } from "../../config/firebase";
import Message from "../Message/Message";
import styles from "./Messages.module.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSubscribe = onSnapshot(doc(db, "chats", data?.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSubscribe();
    };
  }, [data.chatId]);

  return (
    <div className={styles.messages}>
      {!messages.length && (
        <p style={{ textAlign: "center", fontSize: "2rem", marginTop: "25%" }}>
          Start Chatting!
        </p>
      )}
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
