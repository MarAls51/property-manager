import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
  const [userDataUpdated, setUserDataUpdated] = useState();
  const [itemsCount, setItemsCount] = useState(0);
  const [itemsValue, setItemsValue] = useState(0);
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        userData,
        setUserData,
        setUserDataUpdated,
        userDataUpdated,
        itemsCount,
        setItemsCount,
        itemsValue,
        setItemsValue,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
