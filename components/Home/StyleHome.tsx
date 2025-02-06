import { StyleSheet, Dimensions } from "react-native";
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
  container: {
    width: width,
    height: height,
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    width: width,
    height: height,
  },
  containerFiltro: {
    width: width,
    height: height,
    backgroundColor: colors.filtro,
    
  },
  header: {
    width: width,
    height: 80
  },
});

export default styles

