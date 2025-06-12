import { RegisterData } from "../../../types/TypesAuthService"
import api from "../api"; // seu Axios configurado
const formData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  cnpj: ""
}
export class AuthService {
  static async register(data: any, userType: string) {
    return await api.post(`/auth/${userType}/register`, data);
  }

  static async login(data: any, userType: string) {
    return await api.post(`/auth/${userType}/login`, data);
  }
}
export class AuthService {
  constructor(user: RegisterData) {
    this.user = user
    this.submitUser(user)
  }
  submitUser(user: RegisterData) {
    const handleSubmit = async () => {
      setIsLoading(true);
      if (await isValidUser()) {
        try {
          // Prepara os dados conforme o tipo de usuário
          const requestData =
            userType === "driver"
              ? {
                name: formData.name,
                email: formData.email,
                password: formData.password,
              }
              : {
                name_enterprise: formData.name,
                cnpj: formData.cnpj,
                email: formData.email,
                password: formData.password,
              };
          if (isLogin) {
            // Login
            const response = await AuthService.login(requestData, userType);
            console.log(`HERE${JSON.stringify(response)}`);
            // Prepara os dados do token
            const tokenData: AuthRequest<UserType> = {
              token: response.data.token,
              dataUser: response.data.dataUser,
              userType: userType,
            };
            // Salva o token
            // console.log(tokenData);
            await TokenManager.saveAuthData(tokenData);
            // Navega para a tela principal
            console.log("Tipo de usuário:", userType);
            console.log("Objeto navigation:", navigation);
            const canNavigate = navigation.canGoBack();
            console.log("Pode navegar:", canNavigate);
            switch (userType) {
              case "driver":
                navigation.reset({
                  index: 0,
                  routes: [{ name: "DriverHome" }],
                });
                break;
              case "advertiser":
                navigation.reset({
                  index: 0,
                  routes: [{ name: "AdvertiserHome" }],
                });
                break;
              default:
                console.log("Erro inesperado");
            }
          }
          // navigateToHome(navigation, tokenData.userType);
          else {
            // Cadastro
            const response = await AuthService.register(requestData, userType);
            Alert.alert(
              "Sucesso",
              response.message || "Cadastro realizado com sucesso"
            );
            setIsLogin(true); // Volta para a tela de login
          }
        } catch (error: any) {
          Alert.alert(
            "Erro",
            error.message || "Ocorreu um erro durante a operação"
          );
        }
      }
      setIsLoading(false);
    };
  }
}