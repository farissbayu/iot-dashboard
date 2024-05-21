/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({
  isLoggedIn: false,
  isLoading: true,
  clearUserData: () => {},
  setUserData: () => {},
});

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function setUserData(token, userData) {
    const userDataString = JSON.stringify(userData);

    Cookies.set("authorization", token, { expires: 365, path: "/" });

    localStorage.setItem("token", token);
    localStorage.setItem("userData", userDataString);

    setIsLoggedIn(true);
  }

  function clearUserData() {
    Cookies.remove("authorization");

    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    setIsLoggedIn(false);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, clearUserData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
