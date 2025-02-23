import * as SecureStore from "expo-secure-store";
const apiUrl = "https://adroad-api.onrender.com";
interface TokenData {
    token: string;
    issuedAt: string;
    userData: {
        id: string;
        name: string;
        email: string;
        createdAt: string;
    };
}
const tokenManager = () => {
    const removeTokenLocal = async () => {
        try {
            await SecureStore.deleteItemAsync("token");
            await SecureStore.deleteItemAsync("issuedAt");
            await SecureStore.deleteItemAsync("userData");
            console.log("Bancos Deletados");
        } catch (error) {
            console.error(error);
        }
    };
    const verifyUserExist = async (id: string, token: string): bolean => {
        try {
            const responseVerify = await fetch(`${apiUrl}/driver/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token
                }
            });
            const dataVerify = await responseVerify.json();
            if (dataVerify == !null) {
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
    const getTokenLocal = async (): Promise<TokenData | null> => {
        if (!verifyUserExist) {
            console.error("Usuário Inexistente");
            return;
        }
        try {
            const token = await SecureStore.getItemAsync("token");
            const issuedAt = await SecureStore.getItemAsync("issuedAt");
            const userData = await SecureStore.getItemAsync("userData");
            if (token && issuedAt && userData) {
                const userObj = JSON.parse(userData);
                return {
                    token: token,
                    issuedAt: parseInt(issuedAt),
                    userData: {
                        id: userObj.id,
                        name: userObj.name,
                        email: userObj.email,
                        createdAt: userObj.createdAt
                    }
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
            await SecureStore.setItemAsync("token", token);
            await SecureStore.setItemAsync(
                "issuedAt",
                JSON.stringify(issuedAt)
            );
            await SecureStore.setItemAsync(
                "userData",
                JSON.stringify(userData)
            );
        } catch (error) {
            console.error(error);
        }
    };
    const updateTokenLocal = async (
        token: string,
        issuedAt: number,
        userData: object
    ) => {
        try {
            console.log("Alterando…");
            await saveTokenLocal(token, issuedAt, userData);
            console.log(`Token Atualizado! ${token}`);
            console.log(`Data do Token Atualizada! ${issuedAt}`);
            console.log(`Dados do usuario Atualizados! ${userData}`);
            return await getTokenLocal();
        } catch (error) {
            console.error(error);
        }
    };
    return {
        removeTokenLocal,
        verifyUserExist,
        getTokenLocal,
        saveTokenLocal,
        updateTokenLocal
    };
};
export default tokenManager;
