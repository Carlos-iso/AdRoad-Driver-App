import { RegisterData } from "../../../types/TypesAuthService"
import api from "../Classes/ApiService";
import { showAlert } from "../../Alert/Alert"
const formData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  cnpj: ""
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
            await TokenManager.saveAuthData(tokenData);
          }
          else {
            // Cadastro
            const response = await AuthService.register(requestData, userType);
            showAlert("success", "Sucesso", response.message || "Cadastro realizado com sucesso")
          }
        } catch (error: any) {
          showAlert("error", "Erro", error.message || "Ocorreu um erro durante a operação")
        }
      }
      setIsLoading(false);
    };
  }
}
