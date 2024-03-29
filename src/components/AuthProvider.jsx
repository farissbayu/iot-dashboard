import { createContext, useContext, useState } from "react";

const apiUrl = 'http://localhost:8080/api/v1/';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null); 

  async function login(loginBody) {
    const response = await fetch(apiUrl + "user/login", {
      method: "POST",
      body: JSON.stringify(loginBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error("Failed to login.");
    }

    const token = responseData.data.token;
    const user = {
      id_user: responseData.data.id_user,
      username: responseData.data.username,
      email: responseData.data.email,
      status: responseData.data.status,
      is_admin: responseData.data.is_admin,
    };

    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(user));
    setIsLoggedIn(true);
    return { message: "Login successful." };
  }

  function logout() {
    setIsLoggedIn(false);
    
    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    console.log("Logout successful");
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
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
