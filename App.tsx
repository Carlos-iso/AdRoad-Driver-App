import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import StackRoutes from "./routes/stack.routes";
import { useFonts } from "expo-font";
import { Jura_400Regular } from "@expo-google-fonts/jura";

export default function App() {
    const [fontsLoaded] = useFonts({
        Jura_400Regular
    });
    if (!fontsLoaded) {
        return <Text>Loading fonts…</Text>;
    }
    return (
        <NavigationContainer>
            <StackRoutes />
        </NavigationContainer>
    );
}
