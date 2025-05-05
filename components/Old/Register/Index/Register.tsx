import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../routes/types";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  Alert
} from "react-native";
import RegisterService from "../Classes/RegisterService";
import backgroundImage from "../../../assets/arts/background-adroad.png";
import Icon from "../../../assets/svgs/Logo.svg";
import tokenManager from "../../../Utils/tokenManager";
import Loanding from "../../../Loading/Index/Loading";
import { timeMs } from "../../../Utils/Utils";
import styles from "../Stylesheet/styleRegister";
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
  const { getTokenLocal } = tokenManager();
  const authToken = async () => {
    const sessionToken = await getTokenLocal();
    if (!sessionToken) {
      if (!navigation.isFocused()) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Register" }],
        });
        Alert.alert(`Cadastre-se!`, "Crie Uma Conta Agora!");
        return;
      }
      return;
    }
    if (sessionToken.token === "" || sessionToken.issuedAt > timeMs(120)) {
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
      Loanding
    }
    if (
      sessionToken.issuedAt <= timeMs(120) &&
      sessionToken.issuedAt > timeMs(0)
    ) {
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
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
      Alert,
    });
    await registerService.execute(usuario);
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Image source={backgroundImage} style={styles.fundo} resizeMode="cover" />
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
          <TouchableOpacity style={styles.botao} onPress={onRegister}>
            <Text style={styles.botaoTexto}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
