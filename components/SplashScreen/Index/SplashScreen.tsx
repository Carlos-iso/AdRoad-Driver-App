import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/types";
import { View, Text, Animated, StyleSheet } from "react-native";
import { Svg, Path } from "react-native-svg";
import anime from "animejs";

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SplashScreen"
>;
export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // tempo de carregamento em milissegundos
    return () => clearTimeout(timer);
  }, []);
  const svgAnim = new Animated.Value(0);
  const textAnim = new Animated.Value(0);
  useEffect(() => {
    anime({
      targets: svgAnim,
      value: 1,
      duration: 2000,
      easing: "easeInOutQuad",
    });
    anime({
      targets: textAnim,
      value: 1,
      duration: 2000,
      easing: "easeInOutQuad",
      delay: 500,
    });
  }, []);
  useEffect(() => {
    if (!isLoading) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  }, [isLoading, navigation]);
  return (
    <View style={styles.container}>
        <View style={styles.carContainer}>
          <Animated.View style={{ transform: [{ scale: svgAnim }] }}>
            <Svg
              width="46"
              height="32"
              viewBox="0 0 46 32"
              fill="none"
            >
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.363 0C8.93456 0 4.53392 4.40065 4.53392 9.82913H1.45472C1.45472 9.82913 0.117021 10.3752 0.00568665 11.7403C-0.105648 13.1055 1.45472 14.0156 1.45472 14.0156H4.53392V23.6978C4.53392 25.3874 5.90361 26.7571 7.59322 26.7571V30.5537C7.59322 30.5537 7.59322 32 9.67232 32C11.7514 32 11.7514 30.5537 11.7514 30.5537C11.7514 28.4569 13.4512 26.7571 15.548 26.7571H29.8083C31.8552 26.7571 33.5145 28.4164 33.5145 30.4633C33.5145 30.4633 33.5145 32 35.7062 32C37.7853 31.948 37.7853 30.4633 37.7853 30.4633V26.7571C39.328 26.7571 40.5786 25.5065 40.5786 23.9638V14.0156H44.1106C44.1106 14.0156 45.3785 13.1055 45.3785 11.7403C45.3785 10.3752 44.1106 9.82913 44.1106 9.82913H40.5786C40.5786 4.40065 36.178 0 30.7495 0H14.363ZM16.5583 2.89258C13.0032 2.89258 9.84213 5.15478 8.6952 8.51978C8.15493 10.1049 9.33323 11.7513 11.0079 11.7513H34.0285C35.7613 11.7513 36.9625 10.0231 36.3586 8.39903C35.1277 5.08862 31.9682 2.89258 28.4363 2.89258H16.5583ZM13.0175 18.8022C13.0175 20.2999 11.8033 21.5141 10.3056 21.5141C8.80789 21.5141 7.59375 20.2999 7.59375 18.8022C7.59375 17.3045 8.80789 16.0903 10.3056 16.0903C11.8033 16.0903 13.0175 17.3045 13.0175 18.8022ZM34.8925 21.5141C36.3903 21.5141 37.6044 20.2999 37.6044 18.8022C37.6044 17.3045 36.3903 16.0903 34.8925 16.0903C33.3948 16.0903 32.1807 17.3045 32.1807 18.8022C32.1807 20.2999 33.3948 21.5141 34.8925 21.5141Z"
              fill="white"
            />
          </Svg>
        </Animated.View>
        <Animated.View
          style={{ transform: [{ scale: textAnim }], marginTop: 20 }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>AdRoad</Text>
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333", // Fundo escuro para melhor contraste
  },
  carContainer: {
    position: "absolute",
    zIndex: 2,
  },
});
