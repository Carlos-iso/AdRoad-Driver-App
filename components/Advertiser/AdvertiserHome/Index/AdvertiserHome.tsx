import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
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
} from "../../../../types/TypesAuthService";
type AdvertiserHomeNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AdvertiserHome"
>;
export default function AdvertiserHome() {
  // Nome da tela vindo da navegação ou definido manualmente
  const [screenName, setScreenName] = useState<string>("Home do Anunciante");
  const route = useRoute();
  const [userData, setUserData] = useState<
    DriverProfile | AdvertiserProfile
  >(null);
  const navigation = useNavigation<AdvertiserHomeNavigationProp>();
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const authData = await TokenManager.getAuthData();
        if (!authData) {
          navigation.replace("Auth", { userType: "advertiser" });
          return;
        }
        setUserData(authData.dataUser);
      } catch (error) {
        console.error("Failed to load user data:", error);
        navigation.replace("Auth", { userType: "advertiser" });
      } finally {
        setIsLoading(false);
      }
    };
    loadUserData();
  }, [navigation]);
  // if (isLoading) {
  //     return (
  //       <View style={[styles.containerHome, { justifyContent: 'center' }]}>
  //         <ActivityIndicator size="large" color="#0000ff" />
  //       </View>
  //     );
  //   }
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
