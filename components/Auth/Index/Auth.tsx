import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native";
import styles from "../Stylesheet/StyleAuth";
import Loading from "../../Loading/Index/Loading";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/types";
import ValidationContract from "../../Validation/fluentValidator";
import { useAuth } from "../../contexts/AuthContext";
import { AuthService } from "../Classes/AuthService";
import TokenManager from "../../Utils/tokenManager";
import { formatCNPJ } from "../../Utils/Utils";
import { navigateToHome } from "../../Utils/navigationHelpers";
import { Ionicons } from "@expo/vector-icons";
type AuthNavigationProp = StackNavigationProp<RootStackParamList, "Auth">;
export default function AuthScreen() {
    const route = useRoute();
    const navigation = useNavigation<AuthNavigationProp>();
    const { userType } = useAuth()
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        cnpj: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    // Live validate
    const validateField = (field: string, value: string) => {
        const contract = new ValidationContract();
        switch (field) {
            case "email":
                contract.isEmail(value, "E-mail inválido");
                contract.hasMaxLen(value, 30, "E-mail muito longo");
                break;
            case "password":
                contract.hasMinLen(value, 8, "Senha muito curta");
                contract.hasMaxLen(value, 20, "Senha muito longa");
                break;
            case "name":
                contract.hasMinLen(value, 3, "Nome muito curto");
                contract.hasMaxLen(value, 20, "Nome muito longo");
                break;
            case "cnpj":
                if (userType === "advertiser") {
                    contract.isCNPJ(value, "CNPJ inválido");
                }
                break;
            case "confirmPassword":
                if (value !== formData.password) {
                    contract.confirmKey(
                        value,
                        formData.password,
                        "As senhas não coincidem"
                    );
                }
                break;
        }
        const fieldErrors = contract.getErrors();
        setErrors(prev => ({
            ...prev,
            [field]: fieldErrors.length > 0 ? fieldErrors[0].message : ""
        }));
        contract.clear();
    };
    const isValidUser = async (): Promise<boolean> => {
        const contract = new ValidationContract();
        let isValid = false;
        // Validações comuns para login e cadastro
        contract.isEmail(formData.email, "E-mail inválido");
        contract.hasMaxLen(
            formData.email,
            30,
            "E-mail muito longo (máx. 30 caracteres)"
        );
        contract.hasMinLen(
            formData.password,
            8,
            "Senha muito curta (mín. 8 caracteres)"
        );
        contract.hasMaxLen(
            formData.password,
            20,
            "Senha muito longa (máx. 20 caracteres)"
        );
        // Validações específicas para cadastro
        if (!isLogin) {
            contract.confirmKey(
                formData.password,
                formData.confirmPassword,
                "As senhas não coincidem"
            );
            // Validação do nome
            if (userType === "driver") {
                contract.hasMinLen(
                    formData.name,
                    3,
                    "Nome muito curto (mín. 3 caracteres)"
                );
                contract.hasMaxLen(
                    formData.name,
                    20,
                    "Nome muito longo (máx. 20 caracteres)"
                );
            } else {
                contract.hasMinLen(
                    formData.name,
                    3,
                    "Nome da empresa muito curto"
                );
                contract.hasMaxLen(
                    formData.name,
                    20,
                    "Nome da empresa muito longo"
                );
            }
            // Validação de CNPJ para anunciante
            if (userType === "advertiser") {
                contract.isCNPJ(formData.cnpj, "CNPJ inválido");
            }
        }
        // Verifica se há erros
        const errors = contract.getErrors();
        if (errors.length > 0) {
            Alert.alert("Atenção", errors.map(e => e.message).join("\n"));
            contract.clear();
            return false;
        }
        contract.clear();
        return true;
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
                              password: formData.password
                          }
                        : {
                              name_enterprise: formData.name,
                              cnpj: formData.cnpj,
                              email: formData.email,
                              password: formData.password
                          };
                if (isLogin) {
                    // Login
                    const response = await AuthService.login(
                        requestData,
                        userType
                    );
                    // Prepara os dados do token
                    const tokenData = {
                        message: response.message,
                        token: response.token,
                        dataUser: response.dataUser,
                        userType: response.userType
                    };
                    // Salva o token
                    console.log(tokenData);
                    await TokenManager.saveAuthData(tokenData);
                    // Navega para a tela principal
                    navigateToHome(navigation, tokenData.userType);
                } else {
                    // Cadastro
                    const response = await AuthService.register(
                        requestData,
                        userType
                    );
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
                        {userType === "driver"
                            ? "Nome completo"
                            : "Nome da empresa"}
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={formData.name}
                        onChangeText={text =>
                            setFormData({ ...formData, name: text })
                        }
                        placeholder={
                            userType === "driver"
                                ? "João Silva"
                                : "Minha Empresa LTDA"
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
                        onChangeText={text =>
                            setFormData({ ...formData, cnpj: formatCNPJ(text) })
                        }
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
                    onChangeText={text => {
                        setFormData({ ...formData, email: text });
                        validateField("email", text);
                    }}
                    onBlur={() => validateField("email", formData.email)}
                    placeholder="seu@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                )}
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    value={formData.password}
                    onChangeText={text =>
                        setFormData({ ...formData, password: text })
                    }
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
                        onChangeText={text =>
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
                    <Loading />
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
