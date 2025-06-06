import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
const statusBarHeight = getStatusBarHeight();
const styles = StyleSheet.create({
	containerProfile: {
		width: "100%",
		height: "100%",
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
	mainProfileCard: {
		width: "100%",
		height: "60%",
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
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "50%",
		backgroundColor: "#C2C2C2",
	},
	profileInfo: {
		height: 200,
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-around",
	},
	profileInfoDivision: {},
	profileInfoName: {
		fontSize: 18,
		fontWeight: 500,
		fontFamily: "Jura_400Regular",
	},
	profileInfoButton: {
		borderRadius: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#0E7E58",
		padding: 8,
	},
	profileInfoPlataform: {
		fontSize: 18,
		fontWeight: 500,
		color: "#fff",
		fontFamily: "Jura_400Regular",
	},
	profileInfoButtonText: {
		color: "#fff",
		fontFamily: "Jura_400Regular",
	},
	profileInfoId: {
		fontSize: 18,
		fontWeight: 500,
		fontFamily: "Jura_400Regular",
	},
	profileInfoaAdCount: {
		fontSize: 18,
		fontWeight: 500,
		fontFamily: "Jura_400Regular",
	},
});
export default styles;
