import { StyleSheet } from "react-native";
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Filtro branco
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
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  formulario: {
    width: "100%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Fundo branco opaco
    borderRadius: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  botao: {
    width: "100%",
    height: 40,
    backgroundColor: "#0E7E58", // Verde
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  botaoTexto: {
    fontSize: 18,
    color: "#FFFFFF",
  },
});
export default styles;
