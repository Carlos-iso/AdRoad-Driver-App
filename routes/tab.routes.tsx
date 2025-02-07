import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
//Screans
import Home from "../components/Home/Home";
import Profile from "../components/Profile/Profile";

const Tab = createBottomTabNavigator();

export default function MenuTabsRoutes() {
  return (
  <Tab.Navigator

  screenOptions={{
    headerShown: false,
    tabBarStyle: {
      backgroundColor: '#000', // Fundo preto com transparência
    },
  }}
>
  <Tab.Screen
    name="HomeTabs"
    component={Home}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Feather name="home" size={size} color={color} />
      ),
      tabBarActiveTintColor: '#FFFFFF', // Cor branca quando ativo
      tabBarInactiveTintColor: '#808080', // Cor cinza quando não ativo
      tabBarLabel: 'Início',
    }}
  />
  <Tab.Screen
    name="Profile"
    component={Profile}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Feather name="user" size={size} color={color} />
      ),
      tabBarActiveTintColor: '#FFFFFF', // Cor branca quando ativo
      tabBarInactiveTintColor: '#808080', // Cor cinza quando não ativo
      tabBarLabel: 'Conta',
    }}
  />
</Tab.Navigator>
  );
}
