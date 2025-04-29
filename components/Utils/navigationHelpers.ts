import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/types";
export const navigateToHome = (
	navigation: StackNavigationProp<RootStackParamList>,
	userType: "driver" | "advertiser"
) => {
	navigation.replace(userType === "driver" ? "DriverHome" : "AdvertiserHome");
};
