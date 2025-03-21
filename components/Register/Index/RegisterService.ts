import { Alert } from "react-native";
interface RegisterServiceParams {
    apiUrl: string;
    navigation: {
        reset: (config: { index: number; routes: { name: string }[] }) => void;
    };
    Alert: typeof Alert;
}
export default class RegisterService {
    private apiUrl: string;
    private navigation: RegisterServiceParams["navigation"];
    private Alert: typeof Alert;
    constructor({ apiUrl, navigation, Alert }: RegisterServiceParams) {
        this.apiUrl = apiUrl;
        this.navigation = navigation;
        this.Alert = Alert;
    }
    async execute(usuario: object):void {
        try {
            const response = await fetch(`${this.apiUrl}/driver/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
            const data = await response.json();
            if (data.message === "Cadastro Bem Sucedido!") {
                this.Alert.alert(`Sucesso!`, data.message);
                this.navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }]
                });
            } else {
                this.Alert.alert(`Falha!`, data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }
}
