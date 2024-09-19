import * as React from "react";

type User = {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;
  providerId: string;
  emailVerified: boolean;
  disabled: boolean;
  providerData: {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoUrl: string;
    providerId: string;
  }[];
  tokensValidAfterTimestamp: string;
  userMetaData: {
    creationTimestamp: string;
    lastSignInTimestamp: string;
    lastRefreshTimestamp: string;
  };
  customClaims: {
    [key: string]: string;
  };
  tenantId: string;
}

const Context = React.createContext<User>(null);

export const CurrentUserProvider = ({ children, user }: { children: React.ReactNode; user: User }) => {
  return <Context.Provider value={user}>{children}</Context.Provider>;
};

export const useCurrentUser = () => React.useContext(Context);
