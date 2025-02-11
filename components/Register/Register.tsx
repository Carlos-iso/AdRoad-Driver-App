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
} from "react-native";
import { Alert } from "react-native";
import { RootStackParamList } from "../../routes/types"; // Importe os tipos
import backgroundImage from "../../assets/arts/background-adroad.png";
import Icon from "../../assets/svgs/Logo.svg";
import AuthVerify from "../Utils/authVerify";

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
    password: "",
  });
  const { getToken } = AuthVerify();
  const verifyToken = async () => {
    const token = await getToken();
    if (!token) {
      if (!navigation.isFocused()) {
        await navigation.reset({ index: 0, routes: [{ name: "Register" }] });
        await Alert.alert(`Cadastre-se`, "Cria Uma Conta Agora!");
      }
    }
    try {
      const tokenString = JSON.stringify(token);
      const tokenObject = JSON.parse(tokenString);
      const expiresAt = tokenObject.expiresAt;
      const dataNow = new Date().getTime();
      const difference = (dataNow - expiresAt);
      console.log(difference)
      if (difference <= 86400000/*Um dia em milisegundos*/) {
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        Alert.alert(`Sucesso!`, "Abrindo Home...");
      } else {
        console.log(`Data Agora:${dataNow} | Data Token:${expiresAt}`)
        navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        Alert.alert(`Falha!`, "Token expirou!");
      }
    } catch (error) {
      console.error(error);
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
      Alert.alert(`Falha!`, "Token Inválido");
    }
  };
  useEffect(() => {
    // Verifique se o objeto de navegação está disponível
    if (!navigation) {
      console.warn("Navegação ainda não está pronta.");
      return;
    }
    verifyToken();
  }, [navigation]);

  const handleRegister = async () => {
    try {
      const response = await fetch(`${apiUrl}/driver/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });
      const data = await response.json();
      if (data.message == "Cadastro Bem Sucedido!") {
        Alert.alert(`Sucesso!`, data.message);
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        Alert.alert(`Falha!`, data.message);
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
        <View style={styles.formulario}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={usuario.name}
            onChangeText={(texto) => setUsuario({ ...usuario, name: texto })}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={usuario.email}
            onChangeText={(texto) => setUsuario({ ...usuario, email: texto })}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={usuario.password}
            onChangeText={(texto) =>
              setUsuario({ ...usuario, password: texto })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            secureTextEntry
            value={usuario.password}
            onChangeText={(texto) =>
              setUsuario({ ...usuario, password: texto })
            }
          />
          <TouchableOpacity style={styles.botao} onPress={handleRegister}>
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
    display: "flex",
  },
  fundo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },
  filtro: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Filtro branco
    position: "absolute",
    top: 0,
    left: 0,
  },
  conteudo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  formulario: {
    width: "100%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Fundo branco opaco
    borderRadius: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  botao: {
    width: "100%",
    height: 40,
    backgroundColor: "#0E7E58", // Verde
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  botaoTexto: {
    fontSize: 18,
    color: "#FFFFFF",
  },
});
