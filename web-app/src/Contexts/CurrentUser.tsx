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
  userMetaData: {
    creationTimestamp: string;
    lastSignInTimestamp: string;
    lastRefreshTimestamp: string;
  };
  customClaims: Record<string, string>;
  verified: boolean;
  roles: string[];
  units: string[];
  events: string[];
  localsKey: string[];
}

const Context = React.createContext<User>(null);

export const CurrentUserProvider = ({ children, user }: { children: React.ReactNode; user: User }) => {
  return <Context.Provider value={user}>{children}</Context.Provider>;
};

export const useCurrentUser = () => React.useContext(Context);
