import { StyleSheet, Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
const { width, height } = Dimensions.get("screen");
const statusBarHeight = getStatusBarHeight();
const colors = {
    primary: "#0946d2", //Azul Logo
    secondary: "#0E7E58", //Verde Logo
    background: "#f8f9fa", //Branco não muito claro
    white: "#ffffff", //Branco
    border: "#ecf0f1", //Tom para bordas
    filtro: "rgba(0, 0, 0, 0.7)"
};

const styles = StyleSheet.create({
    containerHome: {
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
    header: {
        width: "100%",
        height: "20%",
        flexDirection: "column",
        backgroundColor: colors.white,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: statusBarHeight
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 24
    },
    headerWelcome: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    logo: {
        size: 30
    },
    welcomeText: {
        fontFamily: "Jura_700Bold",
        fontSize: 24
    },
    notificationButton: {
        padding: 10
    },
    notificationIcon: {
        width: 24,
        height: 24
    }
});

export default styles;
