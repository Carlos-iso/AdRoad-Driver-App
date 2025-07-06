import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated } from "react-native";
import styles from "./Stylesheet/StyleAlert"
export type AlertType = "success" | "error" | "info" | "warning";
interface AlertState {
  type: AlertType;
  title: string;
  message: string;
}
let _show: (type: AlertType, title: string, message: string, duration?: number) => void;
/** Função global que você vai importar onde precisar */
export const showAlert = (
  type: AlertType,
  title: string,
  message: string,
  duration = 3000
) => {
  _show?.(type, title, message, duration);
};
/** Componente overlay que fica montado uma vez no topo da árvore */
export function AlertOverlay() {
  const [alert, setAlert] = useState<AlertState | null>(null);
  const translateY = useRef(new Animated.Value(-120)).current;
  /** disponibiliza a função para o mundo */
  _show = (type, title, message, duration) => {
    setAlert({ type, title, message });
    Animated.timing(translateY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -120,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setAlert(null));
    }, duration);
  };
  if (!alert) return null;
  const colors: Record<AlertType, string> = {
    success: "#4CAF50",
    error: "#F44336",
    info: "#2196F3",
    warning: "#FFC107",
  };
  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: colors[alert.type], transform: [{ translateY }] },
      ]}
      accessibilityRole="alert"
    >
      <Text style={styles.title}>{alert.title}</Text>
      <Text style={styles.message}>{alert.message}</Text>
    </Animated.View>
  );
}
