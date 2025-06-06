import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/types";
import { UserType } from "../../types/TypesAuthService"
export const navigateToHome = (
  navigation: StackNavigationProp<RootStackParamList>,
  userType: UserType
) => {
  console.log(`Navegando para home do: ${userType}`); // Debug
  if (userType === 'driver') {
    navigation.reset({
      index: 0,
      routes: [{ name: 'DriverHome' }],
    });
  } else {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AdvertiserHome' }],
    });
  }
};