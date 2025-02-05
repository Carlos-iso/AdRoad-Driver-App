import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
//Screans
import Home from "../components/Home";
import Profile from "../components/Profile";

const Tab = createBottomTabNavigator();

export default function MenuTabsRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTabs"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#0946D2",
          tabBarInactiveTintColor: "#000",
          tabBarLabel: "Início",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#0946D2",
          tabBarInactiveTintColor: "#000",
          tabBarLabel: "Conta",
        }}
      />
    </Tab.Navigator>
  );
}
