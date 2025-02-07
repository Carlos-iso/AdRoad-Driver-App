import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import backgroundAdRoad from "../../assets/images/background-adroad.png"
import styles from "./StyleHome"

const { width } = Dimensions.get("window");

const Home = () => {
  const [isOnRide, setIsOnRide] = useState(true);
  const [balance, setBalance] = useState(1250.0);

  // Dados mockados
  const activeAds = [
    {
      id: 1,
      company: "Atacadão",
      value: 2.5,
      progress: 5 / 20,
      description: "Exiba este anúncio e ganhe R$ 2,50 por corrida",
    },
    {
      id: 2,
      company: "Empresa X",
      value: 1.5,
      progress: 0 / 10,
    },
    {
      id: 3,
      company: "Empresa Y",
      value: 2.0,
      progress: 0 / 15,
    },
  ];

  const earningsData = [85, 45, 60, 75, 90, 50, 80]; // Valores semanais

  return (
    <View style={styles.container}>
      <ImageBackground
      source={backgroundAdRoad}
      style={styles.container} >
      {/* Cabeçalho */}
      <View style={styles.header}>
      
      </View>
      
      {/* Status */}

      {/* Anúncios */}

          {/* Anúncio principal */}

          {/* Lista de anúncios */}

        {/* Gráfico de ganhos */}

      {/* Ações rápidas */}
     
      </ImageBackground>
      <View style={styles.containerFiltro}></View>
    </View>
  );
};

export default Home;