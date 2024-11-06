import * as React from "react";
import { FirebaseApp, initializeApp } from "firebase/app";

const firebase = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));

const Context = React.createContext<FirebaseApp>(firebase);

export const FirebaseProvider = ({ children }) => {
  return <Context.Provider value={firebase}>{children}</Context.Provider>;
};

export const useFirebase = () => React.useContext(Context);
