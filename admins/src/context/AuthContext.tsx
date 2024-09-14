// context/AuthContext.tsx
import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const logOut = () => {
    // Clear authentication tokens or data here
    setIsAuthenticated(false);
    window.location.href = "http://localhost:5173/signin";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
