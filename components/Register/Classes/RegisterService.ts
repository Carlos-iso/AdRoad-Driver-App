import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/types";
type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;
interface RegisterServiceParams {
    apiUrl: string;
    navigation: RegisterScreenNavigationProp;
    Alert: typeof Alert;
}

export default class    RegisterService {
    private apiUrl: string;
    private navigation: RegisterServiceParams["navigation"];
    private Alert: typeof Alert;
    constructor({ apiUrl, navigation, Alert }: RegisterServiceParams) {
        this.apiUrl = apiUrl;
        this.navigation = navigation;
        this.Alert = Alert;
    }
    async execute(usuario: object): Promise<void> {
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
