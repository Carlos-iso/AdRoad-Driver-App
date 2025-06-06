import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center"
    },
    title: {
        fontSize: 24,
        fontFamily: "Jura_700Bold",
        textAlign: "center",
        marginBottom: 30,
        color: "#000"
    },
    inputContainer: {
        marginBottom: 15
    },
    label: {
        fontSize: 16,
        fontFamily: "Jura_600SemiBold",
        marginBottom: 5,
        color: "#000"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        fontFamily: "Jura_400Regular"
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4
    },
    button: {
        backgroundColor: "#333",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "Jura_700Bold"
    },
    toggleAuth: {
        marginTop: 20,
        alignItems: "center"
    },
    toggleAuthText: {
        color: "#333",
        fontSize: 14,
        fontFamily: "Jura_500Medium",
        textDecorationLine: "underline"
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    backButtonText: {
        color: "#333",
        fontSize: 16,
        fontFamily: "Jura_600SemiBold",
        marginLeft: 5
    }
});
export default styles
