import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ImageBackground
} from "react-native";
import { Feather } from "@expo/vector-icons";
import backgroundImage from "../../assets/arts/background-adroad.png";
import Icon from "../../assets/svgs/logo-black.svg";
import styles from "./StyleHome";

const { width } = Dimensions.get("window");

const Home = () => {
    const [userName] = useState("Carlos");
    const [status, setStatus] = useState("ativo"); // 'ativo' ou 'inativo'
    const [adPreview, setAdPreview] = useState(null);
    const [showEarnings, setShowEarnings] = useState(false);
    const earnings = [
        { date: "187.8011", amount: 182.8327 },
        { date: "182.9044", amount: 183.1791 },
        { date: "183.1318", amount: 183.1318 }
    ];
    return (
        <View style={styles.containerHome}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <Image source={backgroundImage} style={styles.fundo} />
            <View style={styles.filtro} />
            {/* Header */}
            <View style={styles.header}>
            <View style={styles.headerRow}>
                <View style={styles.headerWelcome}>
                    <Icon style={styles.logo} />
                    <Text style={styles.welcomeText}>
                        Bem Vindo, {userName}!
                    </Text>
                </View>
                <View style={styles.headerNotification}>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Feather name="bell" size={24} color={"#000"} />
                    </TouchableOpacity>
                </View></View>
            </View>
            {/* Status */}
            {/* Anúncios */}
            {/* Anúncio principal */}
            {/* Lista de anúncios */}
            {/* Gráfico de ganhos */}
            {/* Ações rápidas */}
        </View>
    );
};

export default Home;
