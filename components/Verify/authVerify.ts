import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const navigation = useNavigation;

const saveToken = async (token) => {
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

async function verifyToken() {
  const token = await getToken();
  if (token) {
    const getDataToken = token.dataToken; // supondo que o token tenha uma propriedade expirationDate
    const getDataNow = new Date();
    const getDiference = (getDataNow - getDataToken) / (1000 * 60 * 60 * 24);
    if (getDiference > 1) {
      // Se o token ainda está válido, redirecionar para a tela de Home
      await navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
    } else {
      // Se o token expirou, redirecionar para a tela de Login
      await navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
    }
  } else {
    // Se o token não estiver salvo, redirecionar para a tela de Login
    await navigation.reset({
          index: 0,
          routes: [{ name: "Register" }],
        });
  }
};

const logout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
  } catch (error) {
    console.error(error);
  }
};

export default { saveToken, getToken, verifyToken, logout }
