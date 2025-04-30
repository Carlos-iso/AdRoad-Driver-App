import { AuthProvider } from "./components/contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import StackRoutes from "./routes/DriverStack.routes";
import { useFonts } from "expo-font";
import { Jura_400Regular } from "@expo-google-fonts/jura";
import { Jura_700Bold } from "@expo-google-fonts/jura";

export default function App() {
	const [fontsLoaded] = useFonts({
		Jura_400Regular,
		Jura_700Bold,
	});
	if (!fontsLoaded) {
		return <Text>Loading fonts…</Text>;
	}
	return (
		<AuthProvider>
			<NavigationContainer>
				<StackRoutes />
			</NavigationContainer>
		</AuthProvider>
	);
}
