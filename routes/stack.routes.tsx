import { createStackNavigator } from "@react-navigation/stack";
import MenuTabsRoutes from "./tab.routes";
import AdvertiserHome from "../components/AdvertiserHome/Index/AdvertiserHome";
// Screens
import SplashScreen from "../components/SplashScreen/Index/SplashScreen";
import UserSelect from "../components/UserSelect/Index/UserSelect";
import AuthScreen from "../components/Auth/Index/Auth";
const Stack = createStackNavigator();
export default function StackRoutes() {
    return (
        <Stack.Navigator
            initialRouteName="SplashScreen" // Define a tela inicial como SplashScreen
            screenOptions={{
                headerShown: false // Oculta o cabeçalho padrão
            }}
        >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="UserSelect" component={UserSelect} />
            <Stack.Screen
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }} // Ou customize o header
            />
            <Stack.Screen name="DriverHome" component={MenuTabsRoutes} />
            <Stack.Screen name="AdvertiserHome" component={AdvertiserHome} />
        </Stack.Navigator>
    );
}
