// components/AdvertiserTabs/Index/AdvertiserTabs.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import AdvertiserHome from "../components/Advertiser/AdvertiserHome/Index/AdvertiserHome";
import AdvertiserAds from "../components/Advertiser/AdvertiserAds/AdvertiserAds";
import AdvertiserBalance from "../components/Advertiser/AdvertiserBalance/Index/AdvertiserBalance";
import AdvertiserProfile from "../components/Advertiser/AdvertiserProfile/Index/AdvertiserProfile";
const Tab = createBottomTabNavigator();
export default function AdvertiserTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#000",
                    borderTopColor: "transparent"
                }
            }}
        >
            <Tab.Screen
                name='AdvertiserHome'
                component={AdvertiserHome}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name='home' size={size} color={color} />
                    ),
                    tabBarActiveTintColor: "#0E7E58", // Verde para anunciante
                    tabBarInactiveTintColor: "#808080",
                    tabBarLabel: "AdvertiserHome"
                }}
            />           
            <Tab.Screen
                name='AdvertiserAds'
                component={AdvertiserAds}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name='play' size={size} color={color} />
                    ),
                    tabBarActiveTintColor: "#0E7E58",
                    tabBarInactiveTintColor: "#808080",
                    tabBarLabel: "Anúncios"
                }}
            />         
            <Tab.Screen
                name='AdvertiserBalance'
                component={AdvertiserBalance}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name='dollar-sign' size={size} color={color} />
                    ),
                    tabBarActiveTintColor: "#0E7E58",
                    tabBarInactiveTintColor: "#808080",
                    tabBarLabel: "Saldo"
                }}
            />   
            <Tab.Screen
                name='AdvertiserProfile'
                component={AdvertiserProfile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name='user' size={size} color={color} />
                    ),
                    tabBarActiveTintColor: "#0E7E58",
                    tabBarInactiveTintColor: "#808080",
                    tabBarLabel: "Conta"
                }}
            />
        </Tab.Navigator>
    );
}