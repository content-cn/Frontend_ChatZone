import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import ChatContext from "../../context/ChatContext/ChatContext";
import { db } from "../../config/firebase";
import styles from "./Chats.module.css";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unSubscribe = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );

      return () => {
        unSubscribe();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats || {})
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          const {
            userInfo: { photoURL, displayName },
            lastMessage,
          } = chat[1];
          return (
            <div
              className={styles.userChat}
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img src={photoURL} alt="" />
              <div className={styles.userChatInfo}>
                <span>{displayName}</span>
                <p>
                  {lastMessage?.text.length > 30
                    ? lastMessage?.text.slice(0, 30) + "..."
                    : lastMessage?.text}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
