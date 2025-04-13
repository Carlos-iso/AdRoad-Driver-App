// services/AuthService.ts
export default class AuthService {
  private static readonly API_BASE_URL = 'https://adroad-api.onrender.com';

  private static async handleResponse(response: Response): Promise<any> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erro na requisição');
    }
    
    return data;
  }

  public static async registerDriver(data: { name: string; email: string; password: string }): Promise<any> {
    const response = await fetch(`${this.API_BASE_URL}/driver/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return this.handleResponse(response);
  }

  public static async loginDriver(data: { email: string; password: string }): Promise<any> {
    const response = await fetch(`${this.API_BASE_URL}/driver/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return this.handleResponse(response);
  }

  public static async registerAdvertiser(data: { 
    companyName: string; 
    cnpj: string; 
    email: string; 
    password: string 
  }): Promise<any> {
    const response = await fetch(`${this.API_BASE_URL}/advertiser/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return this.handleResponse(response);
  }

  public static async loginAdvertiser(data: { email: string; password: string }): Promise<any> {
    const response = await fetch(`${this.API_BASE_URL}/advertiser/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return this.handleResponse(response);
  }

  // Método para definir o token após login (opcional)
  public static setAuthToken(token: string): void {
    // Implementação de armazenamento do token
    // Exemplo com AsyncStorage ou contexto global
    globalThis.authToken = token;
  }

  // Método para obter headers autenticados (opcional)
  public static getAuthHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${globalThis.authToken}`,
      'Content-Type': 'application/json',
    };
  }
}
