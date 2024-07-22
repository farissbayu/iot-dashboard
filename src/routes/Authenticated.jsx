import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthProvider";

export default function Authenticated({ children }) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // is user is login, return children
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
