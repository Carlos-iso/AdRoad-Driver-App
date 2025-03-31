import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../../routes/types";
import RegisterService from "../../Register/Classes/RegisterService";
import backgroundImage from "../../../assets/arts/background-adroad.png";
import Icon from "../../../assets/svgs/Logo.svg";
import tokenManager from "../../Utils/tokenManager";
import { timeMs } from "../../Utils/Utils";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UserSelect"
>;
export default function UserSelect() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <Image source={backgroundImage} style={styles.fundo} resizeMode="cover" />
      <View style={styles.filtro} />
      <View style={styles.conteudo}>
        <TouchableOpacity style={styles.driverSelect} onPress={() => navigation.navigate("Register")}>
          <Ionicons name="speedometer" size={64} color={"#FFF"} />
          <Text style={styles.textSelect}>Motorista</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.driverSelect}>
          <Ionicons name="business-outline" size={64} color={"#FFF"} />
          <Text style={styles.textSelect}>Anunciante</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
  fundo: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  filtro: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    left: 0,
  },
  conteudo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  driverSelect: {
    width: 150,
    height: 150,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  textSelect: {
    fontSize: 18,
    color: "#FFF",
    marginTop: 10,
  },
});
