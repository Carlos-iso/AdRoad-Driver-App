// TokenManager.ts
import * as SecureStore from "expo-secure-store";
import {
    TokenKey,
    DriverProfile,
    AdvertiserProfile,
    UserType
} from "../Auth/Classes/AuthService";
const API_BASE_URL = "https://adroad-api.onrender.com";
export type StoredUserData = DriverProfile | AdvertiserProfile;
// Tipos locais do TokenManager
export type TokenDataLocal = {
    token: TokenKey;
    dataUser: StoredUserData;
    userType: UserType;
};
export default class TokenManager {
    private static readonly AUTH_DATA_KEY = "auth_data";
    /**
     * Salva os dados de autenticação
     * @param authResponse Resposta da API de autenticação
     * @param userType Tipo de usuário
     */
    public static async saveAuthData<T extends UserType>(
        authResponse: TokenDataLocal<T>,
        userType: T
    ): Promise<void> {
        if (!authResponse.token || !authResponse.dataUser) {
            throw new Error("Dados incompletos para salvar o token");
        }
        const dataToStore: TokenDataLocal = {
            token: authResponse.token,
            user: authResponse.dataUser,
            userType: authResponse.userType
        };
        try {
            await SecureStore.setItemAsync(
                this.userType,
                JSON.stringify(dataToStore)
            );
        } catch (error) {
            console.error("Erro ao salvar token:", error);
            throw new Error("Failed to save token");
        }
    }
    // Remove os dados de autenticação
    public static async clearAuthData(): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(this.AUTH_DATA_KEY);
        } catch (error) {
            console.error("Erro ao remover token:", error);
            throw new Error("Failed to remove token");
        }
    }
    // Obtém os dados de autenticação armazenados
    public static async getAuthData(): Promise<TokenData | null> {
        try {
            const jsonValue = await SecureStore.getItemAsync(
                this.AUTH_DATA_KEY
            );
            if (!jsonValue) return null;
            const parsedData: TokenData = JSON.parse(jsonValue);
            // Verifica se o usuário ainda é válido no servidor
            const isValid = await this.verifyUser(
                parsedData.user.id,
                parsedData.token.token
            );
            return isValid ? parsedData : null;
        } catch (error) {
            console.error("Erro ao obter token:", error);
            return null;
        }
    }
    // Verifica se o usuário ainda existe no servidor
    private static async verifyUser(
        id: string,
        token: string
    ): Promise<boolean> {
        try {
            const response = await fetch(`${API_BASE_URL}/user/verify`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token
                }
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
            ...(authData ? { "x-access-token": authData.token.token } : {})
        };
    }
    // Verifica se o usuário está autenticado
    public static async isAuthenticated(): Promise<boolean> {
        return !!(await this.getAuthData());
    }
}
