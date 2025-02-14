import React, { useEffect, useState } from "react";
import { View, Text, Image, StatusBar, StyleSheet } from "react-native";
import backgroundImage from "../../assets/arts/background-adroad.png";
import { getStatusBarHeight } from "react-native-status-bar-height";
import tokenManager from "../Utils/tokenManager";

const Profile = () => {
  const { getTokenLocal } = tokenManager();
  const [usuario, setUsuario] = useState({
    _id: "",
    name: "",
    email: "",
  });
  const loadProfile = async () => {
    try {
      const getProfileData = await getTokenLocal();
      setUsuario(getProfileData?.userData);
      console.log(getProfileData?.userData);
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
          <View style={styles.profilePhoto}/>
          <View style={styles.profileInfo}>
            <Text style={styles.profileInfoName}>Nome: {usuario.name}</Text>
            <Text style={styles.profileInfoPlataform}>Plataformas: </Text>
            <Text style={styles.profileInfoId}>ID: {usuario._id}</Text>
            <Text style={styles.profileInfoaAdCount}>Anuncios Exibidos: </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const statusBarHeight = getStatusBarHeight();
const styles = StyleSheet.create({
  containerProfile: {
    width: "100%",
    height: "100%",
  },
  fundo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },
  filtro: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Filtro branco
    position: "absolute",
    top: 0,
    left: 0,
  },
  mainProfileCard: {
    width: "100%",
    height: "55%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: statusBarHeight,
  },
  profileCard: {
    width: "100%",
    height: 250,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    gap: 16,
  },
  profilePhoto: {
    width: 200,
    height: 200,
    borderRadius: "50%",
    backgroundColor: "#2c2c2c",
  },
  profileInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  profileInfoName: {
    fontSize: 18,
    fontWeight: 400,
  },
  profileInfoPlataform: {
    fontSize: 18,
    fontWeight: 400,
  },
  profileInfoId: {
    fontSize: 18,
    fontWeight: 400,
  },
  profileInfoaAdCount: {
    fontSize: 18,
    fontWeight: 400,
  },
});

export default Profile;
