import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/types";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
const AuthVerify = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const saveToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return await token;
    } catch (error) {
      console.error(error);
    }
  };

  const verifyToken = async () => {
    const token = await getToken();
    if (token) {
      try {
        const tokenObject = JSON.parse(token);
        const getDataToken = new Date(tokenObject.dataToken).getTime();
        const getDataNow = new Date().getTime();
        const getDiference = (getDataNow - getDataToken) / (1000 * 60 * 60 * 24);
        if (getDiference > 1) {
          // Se o token ainda está válido, redirecionar para a tela de Home
          await navigation.reset({ index: 0, routes: [{ name: "Home" }], });
        } else {
          // Se o token expirou, redirecionar para a tela de Login
          await navigation.reset({ index: 0, routes: [{ name: "Login" }], });
        }
      } catch (error) {
        console.error(error);
        // Se o token não for um objeto válido, redirecionar para a tela de Login
        await navigation.reset({ index: 0, routes: [{ name: "Login" }], });
      }
    } else {
      // Se o token não estiver salvo, redirecionar para a tela de Register
      await navigation.reset({ index: 0, routes: [{ name: "Register" }], });
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await navigation.reset({ index: 0, routes: [{ name: "Login" }], });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    saveToken,
    getToken,
    verifyToken,
    logout,
  };
};

export default AuthVerify;