import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  isLoading: true,
  clearUserData: () => {},
  setUserData: (token, username, id_user, is_admin) => {},
});

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function setUserData(token, userData) {
    const userDataString = JSON.stringify(userData);

    localStorage.setItem("token", token);
    localStorage.setItem("userData", userDataString);

    setIsLoggedIn(true);
  }

  function clearUserData() {
    setIsLoggedIn(false);

    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  });

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
