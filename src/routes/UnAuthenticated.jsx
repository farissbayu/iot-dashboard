import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthProvider";

export default function UnAuthenticated({ children }) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // if user is not loggedin, return to auth page [Login, register, forgot-password]
  return !isLoggedIn ? children : <Navigate to={"/"} replace />;
}
