import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
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
} from "../../../../types/TypesAuthService";
type AdvertiserHomeNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AdvertiserHome"
>;
export default function AdvertiserHome() {
  // Nome da tela vindo da navegação ou definido manualmente
  const [screenName, setScreenName] = useState<string>("Home do Anunciante Faça Login!");
  const [userData, setUserData] = useState<
    DriverProfile | AdvertiserProfile
  >;
  const navigation = useNavigation<AdvertiserHomeNavigationProp>();
  useEffect(() => {
    const loadUserData = async () => {
      try {
        var authData = await TokenManager.getAuthData();
        if (authData === null || authData) {
          navigation.replace("Auth", { userType: "advertiser" });
          return;
        }
        // Verifica o tipo do usuário e extrai os dados corretamente
        if (authData.userType === "driver") {
          const driverData = authData.dataUser as DriverProfile;
          setUserData(driverData.name);
          setScreenName(`Bem-vindo, ${driverData.name}!`);
        } else if (authData.userType === "advertiser") {
          const advertiserData = authData.dataUser as AdvertiserProfile;
          setUserData(advertiserData.name_enterprise);
          setScreenName(`Home do Anunciante ${advertiserData.name_enterprise}, Bem-vindo!`);
          // Se precisar do CNPJ:
          console.log("CNPJ:", advertiserData.cnpj);
          console.log("Nome Empresa:", advertiserData.name_enterprise);
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
        navigation.replace("Auth", { userType: "advertiser" });
      }
    };
    loadUserData();
  }, [navigation]);
  if (!userData) {
    return null; // Ou componente de fallback
  }
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
        <Text style={styles.welcomeText}>Bem Vindo(a), {authData.dataUser.name_enterprise}!</Text>
      </View>
      {/* Conteúdo Principal - Apenas o nome da tela */}
      <View style={styles.containerHome}>
        <Text style={styles.welcomeText}>{screenName}</Text>
      </View>
    </View>
  );
}
