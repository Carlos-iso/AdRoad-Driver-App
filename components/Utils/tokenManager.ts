import * as SecureStore from "expo-secure-store";
const API_BASE_URL = "https://adroad-api.onrender.com";
type TokenKey = {
  token: string;
  expiresAt: number;
};
export type DriverData = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};
export type AdvertiserData = {
  id: string;
  name_enterprise: string;
  email: string;
  cnpj: string;
  createdAt: string;
};
export type DataUser = DriverData | AdvertiserData;
export type UserType = "driver" | "advertiser";
type TokenData = {
  token: TokenKey;
  dataUser: DataUser;
  userType: UserType;
};
export default class TokenManager {
  private static readonly TOKEN_KEY = "token";
  private static readonly DATA_USER = "dataUser";
  private static readonly USER_TYPE = "userType";
  // Armazena os tokens localmente
  public static async saveToken(tokenData: TokenData): Promise<void> {
    if (!tokenData.token || !tokenData.dataUser || !tokenData.userType) {
      throw new Error("Dados incompletos para salvar o token");
    }
    try {
      await Promise.all([
        SecureStore.setItemAsync(
          TokenManager.TOKEN_KEY,
          JSON.stringify(tokenData.token)
        ),
        SecureStore.setItemAsync(
          TokenManager.DATA_USER,
          JSON.stringify(tokenData.dataUser)
        ),
        SecureStore.setItemAsync(TokenManager.USER_TYPE, tokenData.userType),
      ]);
    } catch (error) {
      console.error("Erro ao salvar token:", error);
      throw new Error("Failed to save token");
    }
  }
  // Remove todos os tokens armazenados
  public static async removeLocaldb(): Promise<void> {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(TokenManager.TOKEN_KEY),
        SecureStore.deleteItemAsync(TokenManager.DATA_USER),
        SecureStore.deleteItemAsync(TokenManager.USER_TYPE),
      ]);
      console.log("Tokens removidos com sucesso");
    } catch (error) {
      console.error("Erro ao remover tokens:", error);
      throw new Error("Failed to remove tokens");
    }
  }
  // Verifica se o usuário ainda existe no servidor
  public static async verifyUser(id: string, token: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/driver/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
      if (!response.ok) {
        this.removeLocaldb();
        return false;
      }
      const data = await response.json();
      return !!data;
    } catch (error) {
      console.error("Erro na verificação do usuário:", error);
      return false;
    }
  }
  public static removeToken() {
    throw new Error("Method not implemented.");
  }
  // Obtém os tokens armazenados
  public static async getToken(): Promise<TokenData | null> {
    try {
      const [token, dataUser, userType] = await Promise.all([
        SecureStore.getItemAsync(TokenManager.TOKEN_KEY),
        SecureStore.getItemAsync(TokenManager.DATA_USER),
        SecureStore.getItemAsync(TokenManager.USER_TYPE),
      ]);
      if (!token || !dataUser || !userType) {
        return null;
      }
      const parsedToken: TokenKey = JSON.parse(token);
      const parsedDataUser: DataUser = JSON.parse(dataUser);
      const isValidUser = await this.verifyUser(parsedDataUser.id, token);
      if (!isValidUser) {
        return null;
      }
      return {
        token: parsedToken,
        dataUser: parsedDataUser,
        userType: userType as UserType,
      };
    } catch (error) {
      console.error("Erro ao obter token local:", error);
      return null;
    }
  }
  // Metodo adicional para obter headers de autenticação
  public static async getAuthHeaders(): Promise<Record<string, string>> {
    const tokenData = await this.getToken();
    return {
      "Content-Type": "application/json",
      ...(tokenData ? { "x-access-token": tokenData.token.token } : {}),
    };
  }
  // Verifica se o usuário está autenticado
  public static async isAuthenticated(): Promise<boolean> {
    const tokenData = await this.getToken();
    return !!tokenData;
  }
}
