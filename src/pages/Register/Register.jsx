import React, { useState, useEffect, useRef, useContext } from "react";
import Add from "../../images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";
import AuthContext from "../../context/AuthContext/AuthContext";

const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const displayNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = displayNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const file = e.target[3].files[0];

    console.log(file);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.logo}>Chat Zone</span>
        <span className={styles.title}>Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Name" ref={displayNameRef} />
          <input required type="email" placeholder="Email" ref={emailRef} />
          <input
            required
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {error && <span>Something went wrong</span>}
        </form>
        <p>
          Already a user? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
