import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/types";
import { Feather } from "@expo/vector-icons";
import backgroundImage from "../../../assets/arts/background-adroad.png";
import LogoIcon from "../../../assets/svgs/logo-black.svg";
import { getStatusBarHeight } from "react-native-status-bar-height";
const statusBarHeight = getStatusBarHeight();
const { width } = Dimensions.get("window");
type AdvertiserHomeNavigationProp = StackNavigationProp<
    RootStackParamList,
    "AdvertiserHome"
>;
const AdvertiserHome = () => {
    const navigation = useNavigation<AdvertiserHomeNavigationProp>();
    const [balance] = useState(12500.75);
    const [activeAds] = useState(8);
    const [totalAds] = useState(12);
    const [totalInvested] = useState(35600.0);
    const cards = [
        {
            title: "Perfil",
            icon: "user",
            action: () => navigation.navigate("Profile")
        },
        {
            title: "Saldo",
            value: `R$ ${balance.toFixed(2)}`,
            icon: "dollar-sign",
            action: () => navigation.navigate("Balance")
        },
        {
            title: "Anúncios",
            value: `${activeAds}/${totalAds} ativos`,
            icon: "image",
            action: () => navigation.navigate("AdsManagement")
        },
        {
            title: "Investimento Total",
            value: `R$ ${totalInvested.toFixed(2)}`,
            icon: "trending-up",
            action: () => navigation.navigate("Investments")
        },
        {
            title: "Criar Anúncio",
            icon: "plus-circle",
            action: () => navigation.navigate("CreateAd")
        },
        {
            title: "Relatórios",
            icon: "pie-chart",
            action: () => navigation.navigate("Reports")
        }
    ];
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <Image
                source={backgroundImage}
                style={styles.backgroundImage}
                resizeMode="cover"
            />
            <View style={styles.overlay} />
            <ScrollView contentContainerStyle={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerRow}>
                        <LogoIcon width={120} height={40} />
                        <TouchableOpacity style={styles.notificationButton}>
                            <Feather name="bell" size={24} color={"#000"} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.welcomeText}>Dashboard Anunciante</Text>
                </View>
                {/* Cards Grid */}
                <View style={styles.cardsContainer}>
                    {cards.map((card, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.card}
                            onPress={card.action}
                        >
                            <View style={styles.cardContent}>
                                <Feather
                                    name={card.icon}
                                    size={32}
                                    color={colors.primary}
                                />
                                <Text style={styles.cardTitle}>
                                    {card.title}
                                </Text>
                                {card.value && (
                                    <Text style={styles.cardValue}>
                                        {card.value}
                                    </Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Feather name="settings" size={20} color="#fff" />
                        <Text style={styles.actionText}>Configurações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Feather name="log-out" size={20} color="#fff" />
                        <Text style={styles.actionText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};
const colors = {
    primary: "#0946d2",
    secondary: "#0E7E58",
    white: "#ffffff",
    cardBg: "rgba(255, 255, 255, 0.9)"
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    content: {
        paddingTop: getStatusBarHeight + 20,
        paddingBottom: 40,
        paddingHorizontal: 20
    },
    header: {
        marginBottom: 30
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15
    },
    welcomeText: {
        fontSize: 24,
        fontFamily: "Jura_700Bold",
        color: colors.white
    },
    notificationButton: {
        padding: 10,
        backgroundColor: colors.cardBg,
        borderRadius: 20
    },
    cardsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 30
    },
    card: {
        width: width * 0.43,
        backgroundColor: colors.cardBg,
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    cardContent: {
        alignItems: "center"
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: "Jura_600SemiBold",
        marginTop: 10,
        marginBottom: 5,
        textAlign: "center"
    },
    cardValue: {
        fontSize: 16,
        fontFamily: "Jura_500Medium",
        color: colors.primary,
        textAlign: "center"
    },
    quickActions: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.secondary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25
    },
    actionText: {
        color: colors.white,
        fontFamily: "Jura_600SemiBold",
        marginLeft: 8
    }
});
export default AdvertiserHome;
