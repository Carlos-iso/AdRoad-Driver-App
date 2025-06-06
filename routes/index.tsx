// import { NavigationContainer } from "@react-navigation/native";
// import MenuTabsRoutes from "./DriveTabs.routes";

// export default function Routes() {
//   return (
//     <NavigationContainer>
//       <MenuTabsRoutes />
//     </NavigationContainer>
//   );
// }
// routes/UserRouter.tsx
import { NavigationContainer, useRoute } from "@react-navigation/native";
import DriverTabs from "./DriverTabs.routes";
import AdvertiserTabs from "./AdvertiserTab.routes";
const route = useRoute();
export default function Router() {
  const { userType } = route.params as { userType: "driver" | "advertiser" };
  return (
    <NavigationContainer>
      {userType === "driver" ? <DriverTabs /> : <AdvertiserTabs />}
    </NavigationContainer>
  );
}
