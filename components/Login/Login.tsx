import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    StatusBar
} from "react-native";
import { Alert } from "react-native";
import { RootStackParamList } from "../../routes/types"; // Importe os tipos
import backgroundImage from "../../assets/arts/background-adroad.png";
import Icon from "../../assets/svgs/Logo.svg";
import tokenManager from "../Utils/tokenManager";
import { timeMs, fetchDataApi } from "../Utils/Utils.ts";
const apiUrl = "https://adroad-api.onrender.com";
type RegisterScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Login"
>;
const Login = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const [usuario, setUsuario] = useState({
        email: "",
        password: ""
    });
    const { saveTokenLocal, getTokenLocal } = tokenManager();
    const verifyToken = async () => {
        const sessionToken = await getTokenLocal();
        const dateNow = Date.now();
        const diference = dateNow - sessionToken.issuedAt;
        if (diference > timeMs(120)) {
            // Token expirou
            await Alert.alert(`Sessão Expirou!`, `Tentando Entrar Novamente…`);
            try {
                const headersRefrashToken = {
                    "Content-Type": "application/json",
                    "x-access-token": `${sessionToken?.token}`
                };
                const bodyRefrashToken = {
                    id: sessionToken?.userData?.id
                };
                const dataRefrashToken = await fetchDataApi(
                    `${apiUrl}/driver/refresh-token`,
                    "POST",
                    headersRefrashToken,
                    bodyRefrashToken
                );
                await saveTokenLocal(
                    dataRefrashToken.token.token,
                    dataRefrashToken.token.issuedAt,
                    dataRefrashToken.dataUser
                );
                await Alert.alert(
                    `Bem Vindo De Volta ${sessionToken.userData.name}!`,
                    dataRefrashToken.message
                );
                await navigation.navigate("Home");
            } catch (err) {
                console.error(err);
            }
        } else {
            navigation.navigate("Home");
        }
    };
    useEffect(() => {
        verifyToken();
    }, []);
    const handleLogin = async () => {
        try {
            const response = await fetch(`${apiUrl}/driver/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
            const data = await response.json();
            if (data.message === "Login Bem Sucedido") {
                const { token, dataUser } = data;
                await saveTokenLocal(token.token, token.issuedAt, dataUser);
                Alert.alert(`Sucesso!`, `Bem vindo(a) ${dataUser.name}!`);
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }]
                });
            } else {
                Alert.alert(`Falha!`, data.message);
                console.log(data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <Image source={backgroundImage} style={styles.fundo} />
            <View style={styles.filtro} />
            <View style={styles.conteudo}>
                <Icon width={100} height={100} />
                {/* <Text style={styles.titulo}>Login</Text> */}
                <View style={styles.formulario}>
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        value={usuario.email}
                        onChangeText={texto =>
                            setUsuario({ ...usuario, email: texto })
                        }
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        secureTextEntry
                        value={usuario.password}
                        onChangeText={texto =>
                            setUsuario({ ...usuario, password: texto })
                        }
                    />
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={handleLogin}
                    >
                        <Text style={styles.botaoTexto}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: "flex"
    },
    fundo: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        position: "absolute",
        top: 0,
        left: 0
    },
    filtro: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Filtro branco
        position: "absolute",
        top: 0,
        left: 0
    },
    conteudo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333"
    },
    formulario: {
        width: "100%",
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Fundo branco opaco
        borderRadius: 10
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#CCCCCC",
        borderWidth: 1,
        padding: 10,
        marginBottom: 20
    },
    botao: {
        width: "100%",
        height: 40,
        backgroundColor: "#0E7E58", // Verde
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    botaoTexto: {
        fontSize: 18,
        color: "#FFFFFF"
    }
});
export default Login;
