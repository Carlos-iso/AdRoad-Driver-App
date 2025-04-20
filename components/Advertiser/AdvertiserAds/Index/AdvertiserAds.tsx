import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import backgroundImage from "../../../../assets/arts/background-adroad.png";
import LogoIcon from "../../../../assets/svgs/logo-black.svg";
import styles from "../Stylesheet/StyleAdvertiserAds"; // Crie este arquivo de estilos
const AdvertiserAds = () => {
  // Nome da tela vindo da navegação ou definido manualmente
  const [userName] = useState("Nome do Usuário");
  const [screenName] = useState("Saldo do Anunciante");
  return (
    <View style={styles.containerHome}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Image source={backgroundImage} style={styles.fundo} resizeMode="cover" />
      <View style={styles.filtro} />
      
      {/* Header Padrão */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <LogoIcon width={120} height={40} />
          <TouchableOpacity style={styles.notificationButton}>
            <Feather name="bell" size={24} color={"#000"} />
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
};

export default AdvertiserAds; 