import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/types";
import { Ionicons } from "@expo/vector-icons";
type AuthNavigationProp = StackNavigationProp<RootStackParamList, "Auth">;
export default function AuthScreen() {
  const route = useRoute();
  const navigation = useNavigation<AuthNavigationProp>();
  const { userType } = route.params as { userType: "driver" | "advertiser" };
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cnpj: "",
  });
  const handleSubmit = () => {
    // Validação de campos obrigatórios
    const requiredFields = {
      ...(!isLogin && {
        name: formData.name,
        ...(userType === "advertiser" && { cnpj: formData.cnpj }),
      }),
      ...(isLogin && userType === "advertiser" && { cnpj: formData.cnpj }),
      email: formData.email,
      password: formData.password,
    };
    // Verifica campos vazios
    const emptyFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value?.trim())
      .map(([key]) => {
        // Mapeia nomes amigáveis para os campos
        const fieldNames: Record<string, string> = {
          name: userType === "driver" ? "Nome" : "Nome da empresa",
          email: "E-mail",
          cnpj: "CNPJ",
          password: "Senha",
        };
        return fieldNames[key] || key;
      });
    if (emptyFields.length > 0) {
      alert(
        `Por favor, preencha os seguintes campos:\n⚠ ${emptyFields.join("\n⚠ ")}`
      );
      return;
    }
    // Validação específica para CNPJ (apenas para anunciantes)
    if ((!isLogin || userType === "advertiser") && formData.cnpj) {
      const cleanedCnpj = formData.cnpj.replace(/\D/g, "");
      if (cleanedCnpj.length !== 14) {
        alert("CNPJ deve ter 14 dígitos!");
        return;
      }
    }
    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor, insira um e-mail válido!");
      return;
    }
    // Validação de senha
    if (formData.password.length < 8) {
      alert("A senha deve ter pelo menos 8 caracteres!");
      return;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    const dataToSubmit = isLogin
      ? userType === "driver"
        ? {
            email: formData.email,
            password: formData.password,
          } // Login motorista
        : {
            email: formData.email,
            password: formData.password,
            cnpj: formData.cnpj,
          } // Login anunciante (com CNPJ)
      : userType === "driver"
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          } // Cadastro motorista
        : {
            email: formData.email,
            password: formData.password,
            name_enterprise: formData.name,
            cnpj: formData.cnpj,
          }; // Cadastro anunciante
    console.log("Dados enviados:", dataToSubmit);
    // Aqui você faria a chamada à API para login/registro
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
            style={styles.input}
            value={formData.cnpj}
            onChangeText={(text) => setFormData({ ...formData, cnpj: text })}
            placeholder="00.000.000/0000-00"
            keyboardType="numeric"
            maxLength={18}
          />
        </View>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
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
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isLogin ? "Entrar" : "Cadastrar"}
        </Text>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "Jura_700Bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#000",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontFamily: "Jura_600SemiBold",
    marginBottom: 5,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: "Jura_400Regular",
  },
  button: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Jura_700Bold",
  },
  toggleAuth: {
    marginTop: 20,
    alignItems: "center",
  },
  toggleAuthText: {
    color: "#333",
    fontSize: 14,
    fontFamily: "Jura_500Medium",
    textDecorationLine: "underline",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  backButtonText: {
    color: "#333",
    fontSize: 16,
    fontFamily: "Jura_600SemiBold",
    marginLeft: 5,
  },
});
