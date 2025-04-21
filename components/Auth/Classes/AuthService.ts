// AuthService mediadorlogin/cadastro
import TokenManager from "../../Utils/tokenManager";
export type MessageData = {
    message: string;
};
export type TokenKey = {
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
export type AuthResponse = {
    MessageData;
    TokenKey;
    DataUser;
};
export class AuthService{
  private static readonly API_BASE_URL = "https://adroad-api.onrender.com";
  static async login(body: DataUser, userType: string): Promise<AuthResponse> {
        const response = await fetch(`${this.API_BASE_URL}/${userType}/new`
    }
}
// export default class AuthService {
//     private static readonly API_BASE_URL = "https://adroad-api.onrender.com";
//     private static readonly TOKEN_KEY = "@auth_token";
//     private static async handleResponse(response: Response): Promise<any> {
//         const data = await response.json();
//         if (!response.ok) {
//             throw new Error(data.message || "Erro na requisição");
//         }
//         return data;
//     }
//     public static async registerDriver(data: {
//         name: string;
//         email: string;
//         password: string;
//     }): Promise<any> {
//         const response = await fetch(`${this.API_BASE_URL}/driver/new`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data)
//         });
//         return this.handleResponse(response);
//     }
//     public static async loginDriver(data: {
//         email: string;
//         password: string;
//     }): Promise<any> {
//         const response = await fetch(`${this.API_BASE_URL}/driver/login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data)
//         });
//         return this.handleResponse(response);
//     }
//     public static async registerAdvertiser(data: {
//         name_enterprise: string;
//         email: string;
//         cnpj: string;
//         password: string;
//     }): Promise<any> {
//         const response = await fetch(`${this.API_BASE_URL}/advertiser/new`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data)
//         });
//         return this.handleResponse(response);
//     }
//     public static async loginAdvertiser(data: {
//         cnpj: string;
//         email: string;
//         password: string;
//     }): Promise<any> {
//         const response = await fetch(`${this.API_BASE_URL}/advertiser/login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data)
//         });
//         return this.handleResponse(response);
//     }
    // // Metodo para definir o token após login (opcional)
    // public static setAuthToken(token: string): void {
    //   // Implementação de armazenamento do token
    //   // Exemplo com AsyncStorage ou contexto global
    //   globalThis.authToken = token;
    // }

    // // Metodo para obter headers autenticados (opcional)
    // public static getAuthHeaders(): Record<string, string> {
    //   return {
    //     'Authorization': `Bearer ${globalThis.authToken}`,
    //     'Content-Type': 'application/json',
    //   };
    // }
}
