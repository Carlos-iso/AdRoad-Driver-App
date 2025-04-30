// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import tokenManager from "../Utils/tokenManager";
type UserType = "driver" | "advertiser";
interface AuthContextData {
	userType: UserType | null;
	setUserType: (type: UserType) => void;
	isLoading: boolean;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
	children,
}) => {
	const [userType, setUserType] = useState<UserType | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const loadUserType = async () => {
			const authData = await tokenManager.getAuthData();
			setUserType(authData?.userType || null);
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
