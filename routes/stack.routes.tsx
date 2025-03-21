import { createStackNavigator } from "@react-navigation/stack";
import MenuTabsRoutes from "./tab.routes";
// Screens
import SplashScreen from "../components/SplashScreen/Index/SplashScreen";
import UserSelect from "../components/UserSelect/Index/UserSelect";
import Register from "../components/Register/Index/Register";
import Login from "../components/Login/Index/Login";
const Stack = createStackNavigator();
export default function StackRoutes() {
    return (
        <Stack.Navigator
            initialRouteName='SplashScreen' // Define a tela inicial como Register
            screenOptions={{
                headerShown: false // Oculta o cabeçalho padrão
            }}
        >
            <Stack.Screen name='SplashScreen' component={SplashScreen} />
            <Stack.Screen name='UserSelect' component={UserSelect} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Home' component={MenuTabsRoutes} />
        </Stack.Navigator>
    );
}
