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
    StatusBar,
    Alert
} from "react-native";
import { RootStackParamList } from "../../../routes/types";
import RegisterService from "./RegisterService";
import backgroundImage from "../../../assets/arts/background-adroad.png";
import Icon from "../../../assets/svgs/Logo.svg";
import tokenManager from "../../Utils/tokenManager";
import { timeMs } from "../../Utils/Utils";

const apiUrl = "https://adroad-api.onrender.com";

type RegisterScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Register"
>;

export default function Register() {
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const [usuario, setUsuario] = useState({
        name: "",
        email: "",
        password: ""
    });
    const { getTokenLocal } = tokenManager();
    const authToken = async () => {
        const sessionToken = await getTokenLocal();
        if (!sessionToken) {
            if (!navigation.isFocused()) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Register" }]
                });
                Alert.alert(`Cadastre-se!`, "Crie Uma Conta Agora!");
                return;
            }
            return;
        }
        if (sessionToken.token === "" || sessionToken.issuedAt > timeMs(120)) {
            Alert.alert(`Entrando Novamente!`, `Redirecionando Para Login…`);
            await navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        }
        if (
            sessionToken.issuedAt <= timeMs(120) &&
            sessionToken.issuedAt > timeMs(0)
        ) {
            await navigation.reset({ index: 0, routes: [{ name: "Home" }] });
            Alert.alert(`Sucesso!`, "Abrindo Home…");
        }
    };
    useEffect(() => {
        if (!navigation) {
            console.warn("Navegação ainda não está pronta.");
            return;
        }
        authToken();
    }, [navigation]);
    const onRegister = async () => {
        const registerService = new RegisterService({
            apiUrl,
            navigation,
            Alert
        });
        await registerService.execute(usuario);
        await console.log(typeof usuario);
    };
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <Image
                source={backgroundImage}
                style={styles.fundo}
                resizeMode='cover'
            />
            <View style={styles.filtro} />
            <View style={styles.conteudo}>
                <Icon width={100} height={100} />
                <View style={styles.formulario}>
                    <TextInput
                        style={styles.input}
                        placeholder='Nome'
                        value={usuario.name}
                        onChangeText={texto =>
                            setUsuario({ ...usuario, name: texto })
                        }
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        value={usuario.email}
                        onChangeText={texto =>
                            setUsuario({ ...usuario, email: texto })
                        }
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Senha'
                        secureTextEntry
                        value={usuario.password}
                        onChangeText={texto =>
                            setUsuario({ ...usuario, password: texto })
                        }
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Confirmar Senha'
                        secureTextEntry
                        value={usuario.password}
                        onChangeText={texto =>
                            setUsuario({ ...usuario, password: texto })
                        }
                    />
                    <TouchableOpacity style={styles.botao} onPress={onRegister}>
                        <Text style={styles.botaoTexto}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: "flex"
    },
    fundo: {
        width: "100%",
        height: "100%",
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
