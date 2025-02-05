import { View, Text, StyleSheet } from "react-native";

const Profile = () => {
  return (
    <View>
      <Text style={styles.Profile}>Hello Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    Profile: {
     color: '#000'
    },
  
});

export default Profile;
