import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 10,
    elevation: 6,
    zIndex: 1000,
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  message: { fontSize: 14, color: "#fff", marginTop: 4 },
});
export default styles