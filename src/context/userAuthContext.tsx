import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  GoogleAuthProvider
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

interface IUserAuthContextProviderProps {
  children: React.ReactNode;
}

// creating our type for the userAuthContext
type AuthContextData = {
  user: User | null;
  logIn: typeof logIn; // typeof here means logIn will be type of the function logIn
  logOut: typeof logOut;
  signUp: typeof signUp;
  googleSignIn: typeof googleSignIn;
};

// creating login func. with firebase Auth and signInWithEmailPass method, firebase checks the email an pass in the system
const logIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logOut = () => {
  signOut(auth);
};

const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// using goole auth method in firebaseAuth, using google signIn
const googleSignIn = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
};

// creating our context which values will be shared with children and we need to pass some initial data
export const userAtuthContext = createContext<AuthContextData>({
  user: null,
  logIn,
  logOut,
  signUp,
  googleSignIn,
});

export const UserAuthProvider: React.FunctionComponent<
  IUserAuthContextProviderProps
> = ({ children }) => {
  // setting up user value as null and changing it on authentication
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("logged in user, ", user);
        setUser(user);
      }

      // clean up function
      return () => {
        unsubscribe();
      };
    });
  });

  const value: AuthContextData = {
    user,
    logIn,
    logOut,
    signUp,
    googleSignIn,
  };

  return (
    <userAtuthContext.Provider value={value}>
      {children}
    </userAtuthContext.Provider>
  );
};

// created custom hook to consume the value and use when needed without repitation
export const useUserAuth = () => {
  return useContext(userAtuthContext);
};
