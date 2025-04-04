import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/types";
import { View, Text, Animated, StyleSheet, Easing } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { Svg, Path } from "react-native-svg";

type SplashAdRoadNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SplashAdRoad"
>;

export default function SplashAdRoad() {
  const navigation = useNavigation<SplashAdRoadNavigationProp>();
  
  // Valores animados
  const barScaleY = useRef(new Animated.Value(0)).current;
  const barScaleX = useRef(new Animated.Value(0.1)).current;
  const svgOpacity = useRef(new Animated.Value(0)).current;
  const svgScale = useRef(new Animated.Value(0.5)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textScale = useRef(new Animated.Value(0.5)).current;
  const containerOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Animação da barra "|" crescendo
    Animated.timing(barScaleY, {
      toValue: 1.5,
      duration: 600,
      easing: Easing.out(Easing.back(1.7)),
      useNativeDriver: true,
    }).start();

    Animated.timing(barScaleX, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.back(1.7)),
      useNativeDriver: true,
    }).start(() => {
      // 2. Após a barra crescer, animar o SVG
      Animated.parallel([
        Animated.timing(svgOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(svgScale, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => {
        // 3. Após o SVG aparecer, animar o texto
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textScale, {
            toValue: 1,
            duration: 400,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]).start(() => {
          // 4. Após todas as animações, esperar 1s e navegar
          setTimeout(() => {
            Animated.timing(containerOpacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start(() => {
              navigation.navigate("UserSelect");
            });
          }, 1000);
        });
      });
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
      <View style={styles.animatedContainer}>
        <Animated.View 
          style={[
            styles.animatedViewSvg, 
            { 
              opacity: svgOpacity,
              transform: [{ scale: svgScale }] 
            }
          ]}
        >
          <Svg width="46" height="32" viewBox="0 0 46 32" fill="none">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.363 0C8.93456 0 4.53392 4.40065 4.53392 9.82913H1.45472C1.45472 9.82913 0.117021 10.3752 0.00568665 11.7403C-0.105648 13.1055 1.45472 14.0156 1.45472 14.0156H4.53392V23.6978C4.53392 25.3874 5.90361 26.7571 7.59322 26.7571V30.5537C7.59322 30.5537 7.59322 32 9.67232 32C11.7514 32 11.7514 30.5537 11.7514 30.5537C11.7514 28.4569 13.4512 26.7571 15.548 26.7571H29.8083C31.8552 26.7571 33.5145 28.4164 33.5145 30.4633C33.5145 30.4633 33.5145 32 35.7062 32C37.7853 31.948 37.7853 30.4633 37.7853 30.4633V26.7571C39.328 26.7571 40.5786 25.5065 40.5786 23.9638V14.0156H44.1106C44.1106 14.0156 45.3785 13.1055 45.3785 11.7403C45.3785 10.3752 44.1106 9.82913 44.1106 9.82913H40.5786C40.5786 4.40065 36.178 0 30.7495 0H14.363ZM16.5583 2.89258C13.0032 2.89258 9.84213 5.15478 8.6952 8.51978C8.15493 10.1049 9.33323 11.7513 11.0079 11.7513H34.0285C35.7613 11.7513 36.9625 10.0231 36.3586 8.39903C35.1277 5.08862 31.9682 2.89258 28.4363 2.89258H16.5583ZM13.0175 18.8022C13.0175 20.2999 11.8033 21.5141 10.3056 21.5141C8.80789 21.5141 7.59375 20.2999 7.59375 18.8022C7.59375 17.3045 8.80789 16.0903 10.3056 16.0903C11.8033 16.0903 13.0175 17.3045 13.0175 18.8022ZM34.8925 21.5141C36.3903 21.5141 37.6044 20.2999 37.6044 18.8022C37.6044 17.3045 36.3903 16.0903 34.8925 16.0903C33.3948 16.0903 32.1807 17.3045 32.1807 18.8022C32.1807 20.2999 33.3948 21.5141 34.8925 21.5141Z"
              fill="white"
            />
          </Svg>
        </Animated.View>

        <Animated.View style={{ 
          transform: [
            { scaleY: barScaleY },
            { scaleX: barScaleX }
          ] 
        }}>
          <Text style={styles.textSplash}>|</Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.animatedViewText, 
            { 
              opacity: textOpacity,
              transform: [{ scale: textScale }] 
            }
          ]}
        >
          <Text style={styles.textSplash}>AdRoad</Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333"
  },
  animatedContainer: {
    width: "100%",
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8
  },
  animatedViewSvg: {
    opacity: 0,
    transform: [{ scale: 0.5 }]
  },
  textSplash: {
    fontFamily: "Jura_700Bold",
    fontSize: 24,
    color: "#FFF"
  },
  animatedViewText: {
    opacity: 0,
    transform: [{ scale: 0.5 }]
  },
});