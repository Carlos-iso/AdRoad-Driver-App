import * as SecureStore from "expo-secure-store";
const apiUrl = "https://adroad-api.onrender.com";
const tokenManager = () => {
    const validateTokenLocal = async () => {
        const tokenLocal = await getTokenLocal();
        if (!tokenLocal) return false;
        try {
            const responseVerify = await fetch(
                `${apiUrl}/driver/${tokenLocal.userData.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": `${tokenLocal.token}`
                    }
                }
            );
            const dataVerify = await responseVerify.json();
            if (dataVerify.isValid) {
                return true;
            } else {
                await removeTokenLocal();
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    const getTokenLocal = async () => {
        try {
            const token = await SecureStore.getItemAsync("token");
            const issuedAt = await SecureStore.getItemAsync("issuedAt");
            const userData = await SecureStore.getItemAsync("userData");
            // console.log(token);
            // console.log(issuedAt);
            // console.log(userData);
            if (token && issuedAt && userData) {
                return {
                    token: token,
                    issuedAt: issuedAt,
                    userData: JSON.stringify(userData)
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
        }
    };
    const saveTokenLocal = async (
        token: string,
        issuedAt: number,
        userData: object
    ) => {
        if (!token && !issuedAt && userData) {
            return "API não retornou dados";
        }
        try {
            await SecureStore.setItemAsync("token", JSON.stringify(token));
            await SecureStore.setItemAsync(
                "issuedAt",
                JSON.stringify(issuedAt)
            );
            await SecureStore.setItemAsync(
                "userData",
                JSON.stringify(userData)
            );
            console.log(`Token Salvo!
            ${token}`);
            console.log(`Data do Token Salva!
            ${issuedAt}`);
            console.log(`Dados De Usuário Salvo!
            ${userData}`);
        } catch (error) {
            console.error(error);
        }
    };
    const updateTokenLocal = async (
        token: string,
        issuedAt: number,
        userData: object
    ) => {
        console.log("hello");
        try {
            await SecureStore.setItemAsync("token", JSON.stringify(token));
            await SecureStore.setItemAsync(
                "issuedAt",
                JSON.stringify(issuedAt)
            );
            await SecureStore.setItemAsync(
                "userData",
                JSON.stringify(userData)
            );
            console.log(`Token Atualizado! ${token}`);
            console.log(`Data do Token Atualizada! ${issuedAt}`);
            console.log(`Dados do usuario Atualizados! ${userData}`);
            return await getTokenLocal();
        } catch (error) {
            console.error(error);
        }
    };
    return {
        saveTokenLocal,
        getTokenLocal,
        updateTokenLocal
    };
};
export default tokenManager;
