import * as SecureStore from "expo-secure-store";
import {
	TokenKey,
	DriverProfile,
	AdvertiserProfile,
	UserType,
	AuthResponse,
} from "../../types/TypesAuthService";
const API_BASE_URL = "https://adroad-api.onrender.com";
// type DriverData = {
// 	id: string;
// 	name: string;
// 	email: string;
// 	createdAt: string;
// };
// type AdvertiserData = {
// 	id: string;
// 	name_enterprise: string;
// 	email: string;
// 	cnpj: string;
// 	createdAt: string;
// };
// type DataUser = DriverData | AdvertiserData;
export type TokenData = {
	token: TokenKey;
	dataUser: DriverProfile | AdvertiserProfile;
	userType: UserType;
};
export default class TokenManager {
	/**
	 * Salva os dados de autenticação
	 * @param authData Resposta da API de autenticação
	 */
	public static async saveAuthData(
		authData: AuthResponse<UserType>
	): Promise<void> {
		if (!authData.token || !authData.dataUser || !authData.userType) {
			throw new Error("Dados incompletos para salvar o token");
		}
		try {
			await Promise.all([
				SecureStore.setItemAsync(
					"auth_token",
					JSON.stringify(authData.token)
				),
				SecureStore.setItemAsync(
					"user_data",
					JSON.stringify(authData.dataUser)
				),
				SecureStore.setItemAsync("user_type", authData.userType),
			]);
		} catch (error) {
			console.error("Erro ao salvar token:", error);
			throw new Error("Failed to save token");
		}
	}
	// Remove os dados de autenticação
	public static async clearAuthData(): Promise<void> {
		try {
			await Promise.all([
				await SecureStore.deleteItemAsync("auth_token"),
				await SecureStore.deleteItemAsync("user_data"),
				await SecureStore.deleteItemAsync("user_type"),
			]);
		} catch (error) {
			console.error("Erro ao remover token:", error);
			throw new Error("Failed to remove token");
		}
	}
	// Obtém os dados de autenticação armazenados
	public static async getAuthData(): Promise<TokenData | null> {
		try {
			const [jsonValueToken, jsonValueUser, jsonValueType] = await Promise.all([
				SecureStore.getItemAsync("auth_token"),
				SecureStore.getItemAsync("user_data"),
				SecureStore.getItemAsync("user_type"),
			]);
			if (!jsonValueToken || !jsonValueUser || !jsonValueType) {
				return null;
			}
			const token = JSON.parse(jsonValueToken) as TokenKey;
			const dataUser = JSON.parse(jsonValueUser) as
				| DriverProfile
				| AdvertiserProfile;
			const userType = jsonValueType as UserType;
			// Verifica se o usuário ainda é válido no servidor
			const isValid = await this.verifyUser(dataUser.id, token.token);
			return isValid ? { token, dataUser, userType } : null;
		} catch (error) {
			console.error("Erro ao obter token:", error);
			return null;
		}
	}
	// Verifica se o usuário ainda existe no servidor
	private static async verifyUser(id: string, token: string): Promise<boolean> {
		try {
			const response = await fetch(`${API_BASE_URL}/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"x-access-token": token,
				},
			});
			return response.ok;
		} catch (error) {
			console.error("Erro na verificação do usuário:", error);
			return false;
		}
	}
	public static removeToken() {
		throw new Error("Method not implemented.");
	}
	// Obtém os tokens armazenados
	// public static async getToken(): Promise<TokenData | null> {
	// 	try {
	// 		const [token, dataUser, userType] = await Promise.all([
	// 			SecureStore.getItemAsync("auth_token"),
	// 			SecureStore.getItemAsync(TokenManager.DATA_USER),
	// 			SecureStore.getItemAsync(TokenManager.USER_TYPE),
	// 		]);
	// 		if (!token || !dataUser || !userType) {
	// 			return null;
	// 		}
	// 		const parsedToken: TokenKey = JSON.parse(token);
	// 		const parsedDataUser: DataUser = JSON.parse(dataUser);
	// 		const isValidUser = await this.verifyUser(parsedDataUser.id, token);
	// 		if (!isValidUser) {
	// 			return null;
	// 		}
	// 		return {
	// 			token: parsedToken,
	// 			dataUser: parsedDataUser,
	// 			userType: userType as UserType,
	// 		};
	// 	} catch (error) {
	// 		console.error("Erro ao obter token local:", error);
	// 		return null;
	// 	}
	// }
	// Metodo adicional para obter headers de autenticação
	public static async getAuthHeaders(): Promise<Record<string, string>> {
		const authData = await this.getAuthData();
		return {
			"Content-Type": "application/json",
			...(authData ? { "x-access-token": authData.token.token } : {}),
		};
	}
	// Verifica se o usuário está autenticado
	public static async isAuthenticated(): Promise<boolean> {
		return !!(await this.getAuthData());
	}
}
