import { createStackNavigator } from "@react-navigation/stack";
import MenuTabsRoutes from "./tab.routes";

// Screens
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Register" // Define a tela inicial como Register
      screenOptions={{
        headerShown: false, // Oculta o cabeçalho padrão
      }}
    >
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={MenuTabsRoutes}
      />
    </Stack.Navigator>
  );
}
