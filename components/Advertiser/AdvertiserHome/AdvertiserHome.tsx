import React, { useState, useEffect } from "react";
import { View, Text, Image, StatusBar, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/types";
import TokenManager, { TokenData } from "../../Utils/tokenManager";
import styles from "./Stylesheet/StyleAdvertiserHome";
import backgroundImage from "../../../assets/arts/background-adroad.png";
import LogoIcon from "../../../assets/svgs/logo-black.svg";
import { Feather } from "@expo/vector-icons";
import { AdvertiserProfile } from "../../../types/TypesAuthService";
type AdvertiserHomeNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AdvertiserHome"
>;
export default function AdvertiserHome() {
  // Nome da tela vindo da navegação ou definido manualmente
  const [screenName, setScreenName] = useState<string>(
    "Home do Anunciante Faça Login E Tente!"
  );
  const [advertiserData, setAdvertiserData] = useState<AdvertiserProfile | null>(null);
  const navigation = useNavigation<AdvertiserHomeNavigationProp>();
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await TokenManager.getAuthData();
        if (!data) {
          navigation.replace("Auth", { userType: "advertiser" });
          return;
        }
        // Verifica o tipo do usuário e extrai os dados corretamente
        const advertiserData = data.dataUser as AdvertiserProfile;
        setAdvertiserData(advertiserData);
        setScreenName(
          `Home do Anunciante ${advertiserData.name_enterprise}, Bem-vindo!`
        );
      } catch (error) {
        console.error("Failed to load user data:", error);
        navigation.replace("Auth", { userType: "advertiser" });
      }
    };
    loadUserData();
  }, [navigation]);
  if (!advertiserData) {
    return null; // Ou componente de fallback
  }
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
        <Text style={styles.welcomeText}>Bem Vindo(a), {advertiserData?.name_enterprise}!</Text>
      </View>
      {/* Conteúdo Principal - Apenas o nome da tela */}
      <View style={styles.containerHome}>
        <Text style={styles.welcomeText}>{screenName}</Text>
      </View>
    </View>
  );
}
