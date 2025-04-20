import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import backgroundImage from "../../../../assets/arts/background-adroad.png";
import LogoIcon from "../../../../assets/svgs/logo-black.svg";
import UberIcon from "../../../../assets/svgs/uber_icon.svg";
import styles from "../Stylesheet/StyleDriverHome";
const DriverHome = () => {
  const adUrl =
    "https://atacadaobr.vtexassets.com/assets/vtex.file-manager-graphql/images/ae4c17a0-f1e6-45d5-b3a8-c097e055fa09___38b833a1b30024fdf37510ac2578a542.jpg";
  const [userName] = useState("Carlos");
  const [status, setStatus] = useState("ativo"); // 'ativo' ou 'inativo'
  const [adPreview, setAdPreview] = useState(adUrl);
  const [showEarnings, setShowEarnings] = useState(false);
  const earnings = [
    { date: "187.8011", amount: 182.8327 },
    { date: "182.9044", amount: 183.1791 },
    { date: "183.1318", amount: 183.1318 },
  ];
  return (
    <View style={styles.containerHome}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Image source={backgroundImage} style={styles.fundo} resizeMode="cover" />
      <View style={styles.filtro} />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.headerWelcome}>
            <LogoIcon style={styles.logo} />
            <Text style={styles.welcomeText}>Bem Vindo, {userName}!</Text>
          </View>
          <View style={styles.headerNotification}>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => console.log("Botão Notificações Pressionado!")}
            >
              <Feather name="bell" size={24} color={"#000"} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Status */}
        <View style={styles.statusContainer}>
          <View style={styles.statusRow}>
            <View style={styles.statusAd}>
              <Text style={styles.statusLabel}>Status Anúncios: </Text>
              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor: status === "ativo" ? "green" : "red",
                  },
                ]}
              />
              <Text style={styles.statusText}>
                {status === "ativo" ? "Ativo" : "Inativo"}
              </Text>
            </View>
            <View style={styles.statusPlataform}>
              <Text style={styles.plataformLabel}>Plataforma Em Uso: </Text>
              <UberIcon />
            </View>
          </View>
        </View>
      </View>
      {/* Anúncios Preview */}
      <View style={styles.adPreviewContainer}></View>
      {/* Anúncio principal */}
      {/* Lista de anúncios */}
      {/* Gráfico de ganhos */}
      {/* Ações rápidas */}
    </View>
  );
};
export default DriverHome;
