import React, { useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/types";
import { View } from "react-native";
import {
  Svg,
  Rect,
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import anime from "animejs";
type UserSelecScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UserSelect"
>;
interface Props {
  onAnimationEnd: () => void;
}
export default function SplashScreen({ onAnimationEnd }: Props) {
  const navigation = useNavigation<UserSelecScreenNavigationProp>();
  const svgRef = useRef(null);
  useEffect(() => {
    if (svgRef.current) {
      anime({
        targets: svgRef.current,
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 1000,
        easing: "easeInOutQuad",
        complete: () => onAnimationEnd && onAnimationEnd(), // Chama a função quando a animação terminar
      });
    }
  }, [onAnimationEnd]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Svg
        ref={svgRef}
        width="320"
        height="320"
        viewBox="0 0 320 320"
        fill="none"
      >
        <Rect
          width="320"
          height="320"
          rx="85"
          fill="url(#paint0_linear_2009_9)"
        />
        <Path
          d="M60.0782 124C60.0782 95.2812 83.3594 72 112.078 72H207.45C236.169 72 259.45 95.2812 259.45 124V126.367H278.987C278.987 126.367 286 129.388 286 136.939C286 144.49 278.987 149.524 278.987 149.524H259.45V210C259.45 215.523 254.973 220 249.45 220H244V240.5C244 240.5 244 248.712 232.5 249C220.377 249 220.377 240.5 220.377 240.5V225C220.377 222.239 218.139 220 215.377 220H105C102.239 220 100 222.239 100 225V241C100 241 100 249 88.5 249C77 249 77 241 77 241V220H70.0782C64.5554 220 60.0782 215.523 60.0782 210V149.524H43.0464C43.0464 149.524 34.4156 144.49 35.0315 136.939C35.6473 129.388 43.0464 126.367 43.0464 126.367H60.0782V124Z"
          fill="white"
        />
        <Path
          d="M89.7763 99.5155C92.1233 92.6294 98.5921 88 105.867 88H212.964C220.068 88 226.423 92.4169 228.899 99.0753L240.493 130.257C241.708 133.524 239.292 137 235.806 137H83.9867C80.5597 137 78.1484 133.631 79.254 130.387L89.7763 99.5155Z"
          fill="#0946D2"
        />
        <Circle cx="92" cy="176" r="15" fill="#0946D2" />
        <Circle cx="228" cy="176" r="15" fill="#0946D2" />
        <Defs>
          <LinearGradient
            id="paint0_linear_2009_9"
            x1="160"
            y1="0"
            x2="160"
            y2="320"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0.47" stopColor="#0946D2" />
            <Stop offset="0.57" stopColor="#0E7E58" />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}
