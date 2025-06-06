import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthRequest, UserType, AdvertiserProfile } from "../../../types/TypesAuthService";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/types";
import ValidationContract from "../../Validation/fluentValidator";
import { useAuth } from "../../contexts/AuthContext";
import { AuthService } from "../Classes/AuthService";
import { Cnpj } from "../../Classes/CNPJ";
import { Email } from "../../Classes/Email";
import { Name } from "../../Classes/Name";
import { Password } from "../../Classes/Password";
import TokenManager from "../../Utils/tokenManager";
import { formatCNPJ, normalizerCNPJ } from "../../Utils/Utils";
import Loading from "../../Loading/Index/Loading";
import styles from "../Stylesheet/StyleAuth";
type AuthNavigationProp = StackNavigationProp<RootStackParamList, "Auth">;
export default function AuthScreen() {
  const navigation = useNavigation<AuthNavigationProp>();
  const { userType } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cnpj: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Live validate
  const validateField = (field: string, value: string) => {
    let validatorInstance: any;
    switch (field) {
      case "email":
        validatorInstance = new Email({ email: formData.email });
        break;
      case "password":
        validatorInstance = new Password({ password: formData.password });
        break;
      case "name":
        validatorInstance = new Name({ name: formData.name });
        break;
      case "cnpj":
        validatorInstance = new Cnpj({ cnpj: formData.cnpj });
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "As senhas não coincidem",
          }));
          return;
        } else {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "",
          }));
          return;
        }
    }
    if (validatorInstance && !validatorInstance.isValid()) {
      setErrors((prev) => ({
        ...prev,
        [field]: validatorInstance.errors[0].message,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };
  const isValidUser = (): boolean => {
    let nameValid = true;
    let cnpjValid = true;
    const email = new Email({ email: formData.email });
    const password = new Password({ password: formData.password });
    if (!email.isValid()) {
      setErrors(prev => ({ ...prev, email: email.errors[0].message }));
    }
    if (!password.isValid()) {
      setErrors(prev => ({ ...prev, password: password.errors[0].message }));
    }
    if (!isLogin) {
      const name = new Name({ name: formData.name });
      nameValid = name.isValid();
      if (!nameValid) {
        setErrors(prev => ({ ...prev, name: name.errors[0].message }));
      }
      if (formData.password !== formData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: "As senhas não coincidem" }));
        return false;
      }
      if (userType === "advertiser") {
        const cnpjObj = new Cnpj(cnpjFormData);
        cnpjValid = cnpjObj.isValid();
        if (!cnpjValid) {
          setErrors(prev => ({ ...prev, cnpj: cnpjObj.errors[0].message }));
        }
      }
    }
    return email.isValid() && password.isValid() && nameValid && cnpjValid;
  };
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLogin ? "Login" : "Cadastro"} como{" "}
        {userType === "driver" ? "Motorista" : "Anunciante"}
      </Text>
      {!isLogin && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            {userType === "driver" ? "Nome completo" : "Nome da empresa"}
          </Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder={
              userType === "driver" ? "João Silva" : "Minha Empresa LTDA"
            }
          />
        </View>
      )}
      {userType === "advertiser" && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>CNPJ</Text>
          <TextInput
            style={[styles.input, errors.cnpj && styles.inputError]}
            onChangeText={(text) => setFormData({ ...formData, cnpj: formatCNPJ(text) })}
            value={formData.cnpj}
            placeholder="00.000.000/0000-00"
            keyboardType="numeric"
            maxLength={18}
          />
        </View>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          value={formData.email}
          onChangeText={(text) => {
            setFormData({ ...formData, email: text });
            validateField("email", text);
          }}
          onBlur={() => validateField("email", formData.email)}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          placeholder="********"
          secureTextEntry
        />
      </View>
      {!isLogin && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput
            style={styles.input}
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData({ ...formData, confirmPassword: text })
            }
            placeholder="********"
            secureTextEntry
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loading size={13*2} color="#FFFFFF" bgColor="#FFFFFF" strokeWidth={3}/>
        ) : (
          <Text style={styles.buttonText}>
            {isLogin ? "Entrar" : "Cadastrar"}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.toggleAuth}
        onPress={() => setIsLogin(!isLogin)}
      >
        <Text style={styles.toggleAuthText}>
          {isLogin
            ? "Não tem uma conta? Cadastre-se"
            : "Já tem uma conta? Faça login"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
