import { useQuery } from "@apollo/client";
import React from "react";
import { CURRENT_USER } from "../../api/definitions";

export function login(token) {
  window.localStorage.setItem('token', token);
}

export function isLoggedIn() {
  const token = window.localStorage.getItem('token');
  return token;
}

export function logout() {
  window.localStorage.removeItem('token');
  window.location.reload();
}

const AuthContext = React.createContext(null);
export const AuthProvider = ({children, lazy=true}) => {
  const { loading, error, data } = useQuery(CURRENT_USER);
  return <AuthContext.Provider value={{loading, error, currentUser: data?.me}}>
    {lazy && (!loading && children)}
    {!lazy && children}
  </AuthContext.Provider>
}
export const useAuth = () => React.useContext(AuthContext);
