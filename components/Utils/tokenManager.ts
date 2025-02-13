import * as SecureStore from "expo-secure-store";
const tokenManager = () => {
  const getTokenLocal = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const expiresAt = await SecureStore.getItemAsync("expiresAt");
      const userData = await SecureStore.getItemAsync("userData");
      if (token) {
        return { token: JSON.parse(token), expiresAt, userData: JSON.parse(userData) };
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const saveTokenLocal = async (token: string, expiresAt: string, userData: object) => {
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
      await SecureStore.setItemAsync("userData", JSON.stringify(userData));
      await console.log(`Token Salvo!
      ${token}`);
      await console.log(`Data do Token Salva!
      ${expiresAt}`);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    saveTokenLocal,
    getTokenLocal,
  };
};
export default tokenManager;
