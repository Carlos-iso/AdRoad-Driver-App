import { CNPJProps } from "../components/Classes/CNPJ";
//Tipo para mensagens/callback
export type MessageResponse = {
  message: string;
};
// Tipo para retorno de token
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
  cnpj: CNPJProps;
  createdAt: string;
};
// Tipo unificado para resposta de autenticação
export type AuthResponse<T extends UserType> = {
  message: string;
  token: TokenKey;
  dataUser: T extends "driver" ? DriverProfile : AdvertiserProfile;
  userType: T;
};
// Tipo para credenciais de login
export type LoginCredentials = {
  email: string;
  password: string;
  cnpj?: CNPJProps; // Opcional, apenas para anunciantes
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
  cnpj: CNPJProps;
};
export type RegisterData<T extends UserType> = T extends "driver"
  ? DriverRegisterData
  : AdvertiserRegisterData;