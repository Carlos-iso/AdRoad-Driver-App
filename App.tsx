import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from './routes/stack.routes.tsx';

export default function App() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}