import * as React from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "../config";

const firebase = initializeApp(firebaseConfig);

const Context = React.createContext<FirebaseApp>(firebase);

export const FirebaseProvider = ({ children }) => {
  return <Context.Provider value={firebase}>{children}</Context.Provider>;
};

export const useFirebase = () => React.useContext(Context);
