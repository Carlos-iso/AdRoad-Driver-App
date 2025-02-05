import { View, Text, StyleSheet } from "react-native";

const Home = () => {
  return (
    <View>
      <Text style={styles.home}>Hello Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    home: {
     color: '#000'
    },
  
});

export default Home;
