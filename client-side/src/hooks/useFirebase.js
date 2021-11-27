import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const signInUsingGoogle = (history, location) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        localStorage.setItem("user-auth-token", user.accessToken);
        if (location) {
          history.push(location?.state?.from?.pathname || "/user/profile");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const logout = (history) => {
    signOut(auth).then(() => {
      setUser({});
      localStorage.removeItem("user-auth-token");
      history.push("/user/login");
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (usr) => {
      if (usr) {
        setUser(usr);
      }
    });
  }, []);

  return {
    user,
    error,
    signInUsingGoogle,
    logout,
  };
};

export default useFirebase;
