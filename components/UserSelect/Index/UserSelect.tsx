import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/types";
import RegisterService from "../../Old/Register/Classes/RegisterService";
import { useAuth } from "../../contexts/AuthContext";
import tokenManager from "../../Utils/tokenManager";
import { timeMs } from "../../Utils/Utils";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "../../../assets/svgs/Logo.svg";
import backgroundImage from "../../../assets/arts/background-adroad.png";
type UserSelectNavigationProp = StackNavigationProp<
    RootStackParamList,
    "UserSelect"
>;
export default function UserSelect() {
    const navigation = useNavigation<UserSelectNavigationProp>();
    const { setUserType } = useAuth();
    const handleUserTypeSelect = (userType: "driver" | "advertiser") => {
        setUserType(userType); // Armazena no contexto
        navigation.navigate("Auth", { userType });
    };
    return (
        <View style={styles.container}>
            <Image
                source={backgroundImage}
                style={styles.backgroundImage}
                resizeMode="cover"
            />
            <View style={styles.overlay} />
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.optionSelect}
                    onPress={() => handleUserTypeSelect("driver")}
                >
                    <Ionicons name="speedometer" size={64} color={"#000"} />
                    <Text style={styles.textSelect}>Sou Motorista</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionSelect}
                    onPress={() => handleUserTypeSelect("advertiser")}
                >
                    <Ionicons
                        name="business-outline"
                        size={64}
                        color={"#000"}
                    />
                    <Text style={styles.textSelect}>Sou Anunciante</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: "100%"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
        padding: 20
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
        marginTop: 10
    }
});
