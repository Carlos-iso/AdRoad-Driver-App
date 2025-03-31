import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import StackRoutes from "./routes/stack.routes";
import { useFonts } from "expo-font";
import { Jura_400Regular } from "@expo-google-fonts/jura";
import { Jura_700Bold } from "@expo-google-fonts/jura";
import { Reanimated } from "react-native-reanimated";

export default function App() {
    const [fontsLoaded] = useFonts({
        Jura_400Regular,
        Jura_700Bold
    });
        Reanimated.install();
    if (!fontsLoaded) {
        return <Text>Loading fonts…</Text>;
    }
    return (
        <NavigationContainer>
            <StackRoutes />
        </NavigationContainer>
    );
}
