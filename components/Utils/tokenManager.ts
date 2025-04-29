import * as SecureStore from "expo-secure-store";
import {
	TokenKey,
	DriverProfile,
	AdvertiserProfile,
	AuthResponse,
	UserType,
} from "../Auth/Classes/AuthService";
const API_BASE_URL = "https://adroad-api.onrender.com";
// Tipos locais do TokenManager
export type TokenDataLocal = {
	token: TokenKey;
	dataUser: DriverProfile | AdvertiserProfile;
	userType: UserType;
};
export default class TokenManager {
	/**
	 * Salva os dados de autenticação
	 * @param authResponse Resposta da API de autenticação
	 * @param userType Tipo de usuário
	 */
	public static async saveAuthData<T extends UserType>(
		data: TokenDataLocal
	): Promise<void> {
		if (!data.token || !data.dataUser || !data.userType) {
			throw new Error("Dados incompletos para salvar o token");
		}
		try {
			await Promise.all([
				SecureStore.setItemAsync("auth_token", JSON.stringify(data.token)),
				SecureStore.setItemAsync("user_data", JSON.stringify(data.dataUser)),
				SecureStore.setItemAsync("user_type", data.userType),
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
	public static async getAuthData(): Promise<TokenDataLocal | null> {
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
			const dataUser = JSON.parse(jsonValueUser) as DriverProfile | AdvertiserProfile;
			const userType = jsonValueType as UserType;
			// Verifica se o usuário ainda é válido no servidor
			const isValid = await this.verifyUser(
				dataUser.id,
				token.token
			);
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
	// Obtém headers de autenticação
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
