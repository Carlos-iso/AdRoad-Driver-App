// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import tokenManager from "../Utils/tokenManager";
import { UserType }from "../../types/TypesAuthService"
interface AuthContextData {
  userType: UserType
  setUserType: (type: UserType) => void;
  isLoading: boolean;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [userType, setUserType] = useState<UserType>("driver");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadUserType = async () => {
      const authData = await tokenManager.getAuthData();
      setUserType(authData?.userType || "driver");
      setIsLoading(false);
    };
    loadUserType();
  }, []);
  return (
    <AuthContext.Provider value={{ userType, setUserType, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
