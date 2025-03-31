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
    Alert
} from "react-native";
import { RootStackParamList } from "../../../routes/types";
import RegisterService from "./RegisterService";
import backgroundImage from "../../../assets/arts/background-adroad.png";
import Icon from "../../../assets/svgs/Logo.svg";
import tokenManager from "../../Utils/tokenManager";
import { timeMs } from "../../Utils/Utils";

type RegisterScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "UserSelect"
>;
export default function UserSelect() {
    return (
        <View style={styles.container}>
            <Image
                source={backgroundImage}
                style={styles.fundo}
                resizeMode="cover"
            />
            <View style={styles.filtro} />
            <View style={styles.conteudo}>
                <Text>Welcome to React Native!</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: "flex"
    },
    fundo: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0
    },
    filtro: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Filtro branco
        position: "absolute",
        top: 0,
        left: 0
    },
    conteudo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    }
});
