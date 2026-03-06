import React, { createContext, useContext, useState, useEffect } from "react";
import SupabaseService from "@/services/SupabaseService";
import { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, metadata: { [key: string]: any }) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    ; (async () => {
      const session = await SupabaseService.getSession();
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
      }
    })()
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await SupabaseService.login(email, password);
      setUser(data.user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (email: string, password: string, metadata: { [key: string]: any }): Promise<boolean> => {
    try {
      const data = await SupabaseService.signup(email, password, metadata);
      setUser(data.user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = () => {
    SupabaseService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
