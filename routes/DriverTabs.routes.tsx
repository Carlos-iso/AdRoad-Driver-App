import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
//Screans
import DriverHome from "../components/Driver/DriverHome/Index/DriverHome";
import Profile from "../components/Driver/DriverProfile/DriverProfile";
const Tab = createBottomTabNavigator();
export default function DriverTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#000"
                }
            }}
        >
            <Tab.Screen
                name='DriverHome'
                component={DriverHome}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name='home' size={size} color={color} />
                    ),
                    tabBarActiveTintColor: "#FFFFFF", // Cor branca quando ativo
                    tabBarInactiveTintColor: "#808080", // Cor cinza quando não ativo
                    tabBarLabel: "Início"
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name='user' size={size} color={color} />
                    ),
                    tabBarActiveTintColor: "#FFFFFF", // Cor branca quando ativo
                    tabBarInactiveTintColor: "#808080", // Cor cinza quando não ativo
                    tabBarLabel: "Conta"
                }}
            />
        </Tab.Navigator>
    );
}
