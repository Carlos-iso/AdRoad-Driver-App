import { StyleSheet, Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
const statusBarHeight = getStatusBarHeight();
const { width, height } = Dimensions.get("screen");
const colors = {
  primary: "#0946d2", //Azul Logo
  secondary: "#0E7E58", //Verde Logo
  background: "#f8f9fa", //Branco não muito claro
  white: "#ffffff", //Branco
  border: "#ecf0f1", //Tom para bordas
  filtro: "rgba(0, 0, 0, 0.7)",
};

const styles = StyleSheet.create({
  containerHome: {
    width: "100%",
    height: "100%",
    alignItems: "center",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Filtro branco
    position: "absolute",
    top: 0,
    left: 0,
  },
  header: {
    width: "100%",
    height: "15%",
    flexDirection: "column",
    backgroundColor: colors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: statusBarHeight,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
  },
  headerWelcome: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    
  },
  welcomeText: {
    fontFamily: "Jura_700Bold",
    fontSize: 24,
  },
  headerNotification: {

  },
  notificationButton: {
    padding: 10,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 32,
  },
  statusAd: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusLabel: {
    fontFamily: "Jura_700Bold",
    fontSize: 18,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
  },
  statusPlataform: {
    flexDirection: "row",
    alignItems: "center",
  },
  plataformLabel: {
    fontFamily: "Jura_700Bold",
    fontSize: 18,
  },
  adPreviewContainer: {
    aspectRatio: 16 / 9,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginTop: 24,
  },
  adPreviewImage: {
    width: "100%",
    borderRadius: 10,
  },
});

export default styles;
