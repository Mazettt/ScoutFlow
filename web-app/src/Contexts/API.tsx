import * as React from "react";
import axios, { AxiosInstance } from "axios";

const api = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "https://localhost:7264" : process.env.REACT_APP_API_BASEURL,
  withCredentials: true,
});

const Context = React.createContext<AxiosInstance>(api);

export const APIProvider = ({ children }) => {
  return <Context.Provider value={api}>{children}</Context.Provider>;
};

export const useAPI = () => React.useContext(Context);
