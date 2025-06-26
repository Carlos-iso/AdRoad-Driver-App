/*
Não usa constructor chama a classe.metodo
*/
import TokenManager from "../../Utils/tokenManager"; // Manipular token local
import {
  UserType,
  DriverProfile,
  AdvertiserProfile,
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "../../../types/TypesAuthService"; // Tipos
//Dependencias
import axios from "axios";
export class ApiService {
  private static readonly API_BASE_URL = "https://adroad-api.onrender.com";
  private static apiReq(route: string, body: object) {
    const res = axios.post(
      `${this.API_BASE_URL}${route}`, body)
    return res;
  }
  /**
   * Metodo de login universal
   * @param credentials Credenciais de login
   * @param userType Tipo de usuário (driver ou advertiser)
   */
  static async login<T extends UserType>(
    credentials: LoginCredentials,
    userType: UserType
  ): Promise<{ data: AuthResponse<T>; userType: UserType }> {
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
    const response = await this.apiReq(endpoint, body);
    if (response.status !== 201) {
      const errorData = await response.data;
      throw new Error(errorData.message || "Falha no login");
    }
    const data = await response.data;
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
    const response = await this.apiReq(endpoint, userData);
    if (response.status !== 201) {
      const errorData = await response.data;
      throw new Error(errorData.message || "Falha no registro");
    }
    const data = await response.data;
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
    const dataToStore: AuthResponse<UserType> = {
      message: response.message,
      token: response.token,
      dataUser: response.dataUser,
      userType: response.userType, // Usa o userType da resposta se disponível
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
