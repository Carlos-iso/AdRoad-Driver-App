import { View, Text, Image, StatusBar, StyleSheet } from "react-native";
import backgroundImage from "../../assets/arts/background-adroad.png";
import { getStatusBarHeight } from "react-native-status-bar-height"

const Profile = () => {
    return (
        <View style={styles.containerProfile}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <Image source={backgroundImage} style={styles.fundo} />
        <View style={styles.filtro} />
          <View style={styles.mainProfileCard}>
            <View style={styles.profileCard}>
             <View style={styles.profilePhoto}>
             </View>
             <View style={styles.profileInfo}>
               <Text style={styles.profileInfoName}>Nome:
               `${"Valor"}`
               </Text>
               <Text style={styles.profileInfoPlataform}>Plataformas: `${"Valor"}`
               </Text>
               <Text style={styles.profileInfoId}>ID: `${"Valor"}`
               </Text>
               <Text style={styles.profileInfoAdLength}>Anuncios Exibidos: `${"Valor"}`
               </Text>
	            </View>
            </View>
          </View>
        </View>
    );
};
const statusBarHeight = getStatusBarHeight()
const styles = StyleSheet.create({
    containerProfile: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff"
    },
    mainProfileCard: {
    	width: "100%",
    	height:  "60%",
    	backgroundColor: '#fff',
    	borderRadius: 24,
    	marginTop: statusBarHeight
    },
    profileCard: {
    	width: "100%",
    	height: "45%",
    	flex: 2,
    	flexDirection: 'row',
    	backgroundColor: '#fff',
    	alignItems: 'center',
    	justifyContent: 'center',
    	gap: 16,
    },
    profilePhoto: {
    	width: 150,
    	height: 150,
    	backgroundColor: '#2c2c2c',
    },
    profileInfo: {
    	flex: 1,
    	flexDirection: 'column',
    	justifyContent: 'space-around',
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
    profile: {
        color: "#000"
    }
});

export default Profile;
