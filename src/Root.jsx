// Utilities
import AuthProvider from "./store/AuthProvider";
import Routes from "./routes/Routes";

export default function Root() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
