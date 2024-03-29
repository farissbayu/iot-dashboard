// Utilities
import AuthProvider from "../components/AuthProvider";
import Routes from "./Routes";

export default function Root() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
