import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { Feather } from "@expo/vector-icons";
import backgroundImage from "../../assets/arts/background-adroad.png";
import { getStatusBarHeight } from "react-native-status-bar-height";
import tokenManager from "../Utils/tokenManager";
import Graphic from "./Graphic";
const Profile = () => {
    const { getTokenLocal } = tokenManager();
    const [usuario, setUsuario] = useState({
        id: "",
        name: "",
        email: "",
        createdAt: ""
    });
    const loadProfile = async () => {
        try {
            const getProfileData = await getTokenLocal();
            setUsuario(getProfileData?.userData);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        loadProfile();
    }, []);
    return (
        <View style={styles.containerProfile}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <Image source={backgroundImage} style={styles.fundo} />
            <View style={styles.filtro} />
            <View style={styles.mainProfileCard}>
                <View style={styles.profileCard}>
                    <View style={styles.profilePhoto}>
                        <Feather name="camera" size={64} color={"#000"} />
                    </View>
                    <View style={styles.profileInfo}>
                        <View style={styles.profileInfoDivision}>
                            <Text style={styles.profileInfoName}>
                                Nome: {usuario?.name}
                            </Text>
                            <Text style={styles.profileInfoId}>
                                ID: {usuario?.id}
                            </Text>
                        </View>
                        <View style={styles.profileInfoDivision}>
                            <Text style={styles.profileInfoaAdCount}>
                                Anuncios Exibidos: {"000"}
                            </Text>
                            <Text style={styles.profileInfoPlataform}>
                                Editar Perfil{" "}
                                <TouchableOpacity
                                    style={styles.profileInfoButton}
                                    onPress={() =>
                                        console.log("Botão Ver Pressionado!")
                                    }
                                >
                                    <Feather
                                        name="edit"
                                        size={18}
                                        color={"#fff"}
                                    />
                                </TouchableOpacity>
                            </Text>
                        </View>
                    </View>
                </View>
                <Graphic />
                <TouchableOpacity
                    style={styles.profileInfoButton}
                    onPress={() =>
                        console.log("Botão Ver Detalhes pressionado!")
                    }
                >
                    <Text style={styles.profileInfoButtonText}>
                        Ver Detalhes
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const statusBarHeight = getStatusBarHeight();
const styles = StyleSheet.create({
    containerProfile: {
        width: "100%",
        height: "100%"
    },
    fundo: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
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
    mainProfileCard: {
        width: "100%",
        height: "55%",
        alignItems: "center",
        backgroundColor: "#fff",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: statusBarHeight
    },
    profileCard: {
        width: "100%",
        height: 250,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 24,
        gap: 16
    },
    profilePhoto: {
        width: 200,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        backgroundColor: "#C2C2C2"
    },
    profileInfo: {
        height: 200,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    profileInfoDivision: {
        fontFamily: "Jura_400Regular"
    },
    profileInfoName: {
        fontSize: 18,
        fontWeight: 500,
        fontFamily: "Jura_400Regular"
    },
    profileInfoPlataform: {
        fontSize: 18,
        fontWeight: 500,
        fontFamily: "Jura_400Regular",
        backgroundColor: "#0E7E58",
        color: "#fff",
        borderRadius: 5,
        padding: 4,
        flexDirection: "row",
        textAlign: "center",
    },
    profileInfoButton: {
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0E7E58"
    },
    profileInfoButtonText: {
        color: "#fff",
        fontFamily: "Jura_400Regular"
    },
    profileInfoId: {
        fontSize: 18,
        fontWeight: 500,
        fontFamily: "Jura_400Regular"
    },
    profileInfoaAdCount: {
        fontSize: 18,
        fontWeight: 500,
        fontFamily: "Jura_400Regular"
    }
});

export default Profile;
