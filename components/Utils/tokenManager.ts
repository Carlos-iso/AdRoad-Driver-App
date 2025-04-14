import * as SecureStore from "expo-secure-store";
const API_BASE_URL = "https://adroad-api.onrender.com";
type UserData = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};
type TokenData = {
  token: string;
  issuedAt: number;
  userData: UserData;
};
class TokenManager {
  private static readonly TOKEN_KEY = "token";
  private static readonly ISSUED_AT_KEY = "issuedAt";
  private static readonly USER_DATA_KEY = "userData";
  // Remove todos os tokens armazenados
  public async removeToken(): Promise<void> {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(TokenManager.TOKEN_KEY),
        SecureStore.deleteItemAsync(TokenManager.ISSUED_AT_KEY),
        SecureStore.deleteItemAsync(TokenManager.USER_DATA_KEY),
      ]);
      console.log("Tokens removidos com sucesso");
    } catch (error) {
      console.error("Erro ao remover tokens:", error);
      throw new Error("Failed to remove tokens");
    }
  }
  // Verifica se o usuário ainda existe no servidor
  public async verifyUser(id: string, token: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/driver/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
      if (!response.ok) {
        await this.removeToken();
        return false;
      }
      const data = await response.json();
      return !!data;
    } catch (error) {
      console.error("Erro na verificação do usuário:", error);
      return false;
    }
  }
  // Obtém os tokens armazenados
  public async getToken(): Promise<TokenData | null> {
    try {
      const [token, issuedAt, userData] = await Promise.all([
        SecureStore.getItemAsync(TokenManager.TOKEN_KEY),
        SecureStore.getItemAsync(TokenManager.ISSUED_AT_KEY),
        SecureStore.getItemAsync(TokenManager.USER_DATA_KEY),
      ]);
      if (!token || !issuedAt || !userData) {
        return null;
      }
      const parsedUserData: UserData = JSON.parse(userData);
      const isValidUser = await this.verifyUser(parsedUserData.id, token);
      if (!isValidUser) {
        return null;
      }
      return {
        token,
        issuedAt: parseInt(issuedAt),
        userData: parsedUserData,
      };
    } catch (error) {
      console.error("Erro ao obter token:", error);
      return null;
    }
  }
  // Armazena os tokens localmente
  public async saveToken(
    token: string,
    issuedAt: number,
    userData: UserData
  ): Promise<void> {
    if (!token || !issuedAt || !userData) {
      throw new Error("Dados incompletos para salvar o token");
    }
    try {
      await Promise.all([
        SecureStore.setItemAsync(TokenManager.TOKEN_KEY, token),
        SecureStore.setItemAsync(
          TokenManager.ISSUED_AT_KEY,
          issuedAt.toString()
        ),
        SecureStore.setItemAsync(
          TokenManager.USER_DATA_KEY,
          JSON.stringify(userData)
        ),
      ]);
    } catch (error) {
      console.error("Erro ao salvar token:", error);
      throw new Error("Failed to save token");
    }
  }
  // Método adicional para obter headers de autenticação
  public async getAuthHeaders(): Promise<Record<string, string>> {
    const tokenData = await this.getToken();
    return {
      "Content-Type": "application/json",
      ...(tokenData ? { "x-access-token": tokenData.token } : {}),
    };
  }
  // Verifica se o usuário está autenticado
  public async isAuthenticated(): Promise<boolean> {
    const tokenData = await this.getToken();
    return !!tokenData;
  }
}
// Exporta uma instância singleton
export default new TokenManager();
