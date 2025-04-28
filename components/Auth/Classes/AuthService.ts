// AuthService.ts
import TokenManager from "../../Utils/tokenManager";
// Tipos base
export type MessageResponse = {
    message: string;
};
export type TokenKey = {
    token: string;
    expiresAt: number;
};
export type UserType = "driver" | "advertiser";
// Tipos específicos para cada usuário
export type DriverProfile = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
};
export type AdvertiserProfile = {
    id: string;
    name_enterprise: string;
    email: string;
    cnpj: string;
    createdAt: string;
};
// Tipo unificado para resposta de autenticação
export type AuthResponse<T extends UserType> = {
    message: MessageResponse;
    token: TokenKey;
    dataUser: T extends "driver" ? DriverProfile : AdvertiserProfile;
};
// Tipo para credenciais de login
export type LoginCredentials = {
    email: string;
    password: string;
    cnpj?: string; // Opcional, apenas para anunciantes
};
// Tipos para dados de registro
export type DriverRegisterData = {
    name: string;
    email: string;
    password: string;
};
export type AdvertiserRegisterData = {
    name_enterprise: string;
    email: string;
    password: string;
    cnpj: string;
};
export type RegisterData<T extends UserType> = T extends "driver"
    ? DriverRegisterData
    : AdvertiserRegisterData;
export class AuthService {
    private static readonly API_BASE_URL = "https://adroad-api.onrender.com";
    /**
     * Método de login universal
     * @param credentials Credenciais de login
     * @param userType Tipo de usuário (driver ou advertiser)
     */
    static async login<T extends UserType>(
        credentials: LoginCredentials,
        userType: UserType
    ): Promise<AuthResponse<T>> {
        let endpoint = `${this.API_BASE_URL}/${userType}/login`;
        const body =
            userType === "advertiser"
                ? {
                      email: credentials.email,
                      password: credentials.password,
                      cnpj: credentials.cnpj
                  }
                : {
                      email: credentials.email,
                      password: credentials.password
                  };
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Falha no login");
        }
        const data = await response.json();
        return data as AuthResponse<T>;
    }
    /**
     * Método de registro universal
     * @param userData Dados do usuário
     * @param userType Tipo de usuário (driver ou advertiser)
     */
    static async register<T extends UserType>(
        userData: RegisterData<T>,
        userType: T
    ): Promise<AuthResponse<T>> {
        let endpoint = `${this.API_BASE_URL}/${userType}/new`;
        // O corpo já está tipado corretamente conforme o userType
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Falha no registro");
        }
        const data = await response.json();
        return data as AuthResponse<T>;
    }
    /**
     * Método para lidar com a resposta de autenticação
     * @param response Resposta da API
     * @param userType Tipo de usuário
     */
    static async handleAuthResponse<T extends UserType>(
        response: AuthResponse<T>,
        userType: T
    ): Promise<void> {
        await TokenManager.saveAuthData({
            token: response.token,
            dataUser: response.dataUser, // Note que mudamos para dataUser para corresponder ao AuthResponse
            userType: userType
        });
    }
    // Outros métodos úteis...
    static async logout(): Promise<void> {
        await TokenManager.clearToken();
    }
    static async getCurrentUser(): Promise<{
        user: DriverProfile | AdvertiserProfile;
        userType: UserType;
    } | null> {
        const tokenKey = await TokenManager.getToken();
        return tokenKey
            ? { user: tokenKey.user, userType: tokenKey.userType }
            : null;
    }
}
