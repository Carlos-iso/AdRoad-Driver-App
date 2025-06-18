import TokenManager, { TokenData } from "../../Utils/tokenManager";
import {
  UserType,
  DriverProfile,
  AdvertiserProfile,
  AuthResponse,
  LoginCredentials,
  RegisterData
} from '../../../types/TypesAuthService';
export class ApiService {
  private static readonly API_BASE_URL = "https://adroad-api.onrender.com";
  /**
   * Metodo de login universal
   * @param credentials Credenciais de login
   * @param userType Tipo de usuário (driver ou advertiser)
   */
  static async login<T extends UserType>(
    credentials: LoginCredentials,
    userType: UserType
  ): Promise<{ data: AuthResponse<T>, userType: UserType }> {
    let endpoint = `${this.API_BASE_URL}/${userType}/login`;
    const body =
      userType === "advertiser"
        ? {
          email: credentials.email,
          password: credentials.password,
          cnpj: credentials.cnpj,
        }
        : {
          email: credentials.email,
          password: credentials.password,
        };
        //To axios
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Falha no login");
    }
    const data = await response.json();
    // console.log(`AQUI:
    //          ${JSON.stringify(data)}
    //          ${userType}`)
    return { data, userType };
  }
  /**
   * Metodo de registro universal
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
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
    response: AuthResponse<T>
  ): Promise<void> {
    const dataToStore: TokenData = {
      token: response.token,
      dataUser: response.dataUser,
      userType: response.userType // Usa o userType da resposta se disponível
    };
    await TokenManager.saveAuthData(dataToStore);
  }
  // Outros métodos úteis...
  static async logout(): Promise<void> {
    await TokenManager.clearAuthData();
  }
  static async getCurrentUser(): Promise<{
    user: DriverProfile | AdvertiserProfile;
    userType: UserType;
  } | null> {
    const tokenKey = await TokenManager.getAuthData();
    return tokenKey
      ? { user: tokenKey.dataUser, userType: tokenKey.userType }
      : null;
  }
}
