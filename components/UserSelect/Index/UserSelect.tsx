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

type UserSelectNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UserSelect"
>;
export default function UserSelect() {
  const navigation = useNavigation<UserSelectNavigationProp>();
  return (
    <View style={styles.container}>
      <Image source={backgroundImage} style={styles.fundo} resizeMode="cover" />
      <View style={styles.filtro} />
      <View style={styles.conteudo}>
        <TouchableOpacity style={styles.optionSelect} onPress={() => navigation.navigate("Register")}>
          <Ionicons name="speedometer" size={64} color={"#000"} />
          <Text style={styles.textSelect}>Sou Motorista</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionSelect}>
          <Ionicons name="business-outline" size={64} color={"#000"} />
          <Text style={styles.textSelect}>Sou Anunciante</Text>
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
    gap: 24
  },
  optionSelect: {
    width: 300,
    height: 300,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 24
  },
  textSelect: {
    fontSize: 18,
    fontFamily: "Jura_700Bold",
    color: "#000",
    marginTop: 10,
  },
});
