import * as SecureStore from 'expo-secure-store';
{/* import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/types";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

  const logout = async () => {

    try {

      await SecureStore.deleteItemAsync("token");
      await navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    } catch (error) {
      console.error(error);
    }
  };
  const navigation = useNavigation<RegisterScreenNavigationProp>();
*/}
const AuthVerify = () => {
  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        return JSON.parse(token);
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveToken = async (token: string) => {
    try {
      await SecureStore.setItemAsync("token", JSON.stringify({ token }));
      await console.log("Token Salvo");
      const savedToken = await getToken();
      console.log(savedToken);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    saveToken,
    getToken
  };
};

export default AuthVerify;
