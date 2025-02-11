import * as SecureStore from "expo-secure-store";
const AuthVerify = () => {
  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const expiresAt = await SecureStore.getItemAsync("expiresAt");
      if (token) {
        return { token: JSON.parse(token), expiresAt };
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveToken = async (token: string, expiresAt: string) => {
    if (!token && !expiresAt) {
      console.warn(`API Não Retornou token!
      ${token}`);
      console.warn(`API Não Retornou Data Do Token!
      ${expiresAt}`);
      return;
    }
    try {
      await SecureStore.setItemAsync("token", JSON.stringify(token));
      await SecureStore.setItemAsync("expiresAt", JSON.stringify(expiresAt));
      await console.log(`Token Salvo!
      ${token}`);
      await console.log(`Data do Token Salva!
      ${expiresAt}`);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    saveToken,
    getToken,
  };
};

export default AuthVerify;
