import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../components/AuthProvider";

export function ProtectedRoute({ children }) {
  const token = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/login", { replace: true });
    }
  }, [navigate, token]);

  return children;
}
