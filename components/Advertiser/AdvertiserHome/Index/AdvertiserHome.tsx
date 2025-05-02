import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import {
    useRoute,
    useFocusEffect,
    useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../routes/types";
import TokenManager from "../../../Utils/tokenManager";
import styles from "../Stylesheet/StyleAdvertiserHome";
import backgroundImage from "../../../../assets/arts/background-adroad.png";
import LogoIcon from "../../../../assets/svgs/logo-black.svg";
import { Feather } from "@expo/vector-icons";
import {
    DriverProfile,
    AdvertiserProfile,
} from "../../../Auth/Classes/AuthService";
type AdvertiserHomeNavigationProp = StackNavigationProp<
    RootStackParamList,
    "AdvertiserHome"
>;
export default function AdvertiserHome() {
    // Nome da tela vindo da navegação ou definido manualmente
    const [userName] = useState("Nome do Usuário");
    const [screenName] = useState("Home do Anunciante");
    const route = useRoute();
    const { userType } = route.params as { userType: "driver" | "advertiser" };

    const [userData, setUserData] = useState<
        DriverProfile | AdvertiserProfile | null
    >(null);
    const navigation = useNavigation<AdvertiserHomeNavigationProp>();
    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                const authData = await TokenManager.getAuthData();
                console.log(authData);
                if (!authData?.dataUser) {
                    // Redireciona para login se não houver dados
                    navigation.replace("Auth", { userType: "advertiser" });
                    return;
                }
                if (authData && authData.dataUser) {
                    setUserData(authData.dataUser);
                }
            };
            loadData();
        }, []),
    );
    return (
        <View style={styles.containerHome}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <Image
                source={backgroundImage}
                style={styles.fundo}
                resizeMode='cover'
            />
            <View style={styles.filtro} />
            {/* Header Padrão */}
            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <LogoIcon width={120} height={40} />
                    <TouchableOpacity style={styles.notificationButton}>
                        <Feather name='bell' size={24} color={"#000"} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.welcomeText}>Bem Vindo, {userName}!</Text>
            </View>
            {/* Conteúdo Principal - Apenas o nome da tela */}
            <View style={styles.containerHome}>
                <Text style={styles.welcomeText}>{screenName}</Text>
            </View>
        </View>
    );
}
