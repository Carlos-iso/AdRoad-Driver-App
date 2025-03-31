import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
const Loanding = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Aguarde...</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Loanding;
