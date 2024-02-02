import { createContext, useContext, useState } from "react";

const AuthContext = createContext(undefined);

export default function AuthProvider({children, isLoggedIn}) {
    const [token] = useState(isLoggedIn ? 'token' : null);

    return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}