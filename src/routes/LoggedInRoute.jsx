import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthProvider";

export default function LoggedInRoute({children}) {
  const {isLoggedIn, isLoading} = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />; 
}