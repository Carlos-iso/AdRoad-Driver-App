import { NavigationContainer } from "@react-navigation/native";
import MenuTabsRoutes from "../routes/tab.routes";

export default function Routes() {
  return (
    <NavigationContainer>
      <MenuTabsRoutes />
    </NavigationContainer>
  );
}
