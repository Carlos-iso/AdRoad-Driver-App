import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "./routes/stack.routes"; // Ajuste o caminho
//import Home from "./components/Home.tsx"

export default function App() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}